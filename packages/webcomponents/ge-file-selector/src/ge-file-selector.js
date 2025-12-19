import { LitElement, html, css } from 'lit';

import '@material/web/list/list-item.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/progress/circular-progress.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';

class GeFileSelector extends LitElement {
    static properties = {
        apiEndpoint: { type: String, attribute: 'api-endpoint' },
        authToken: { type: String, attribute: 'auth-token' },

        // state internes
        files: { state: true },
        loading: { state: true },
        error: { state: true },
        modalOpen: { state: true },
        isAddingFile: { state: true },
        selectedFiles: { state: true },
        addedFiles: { state: true },
        label1: { state: true },
        label2: { state: true },
    };

    static styles = css`
        .error { color: red; margin-bottom: 8px; }
        md-list { max-height: 300px; overflow-y: auto; }

        .modal {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 16px;
            border-radius: 8px;
            width: 80%;
            max-width: 600px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
        }

        .centered { display: flex; justify-content: center; align-items: center; flex: 1; }

        .drop-zone {
            border: 2px dashed #ccc;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            cursor: pointer;
            background-color: #fafafa;
            margin-bottom: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
        }

        .drop-zone.dragover { border-color: #00796b; background-color: #e0f2f1; }

        .drop-zone-icon { font-size: 32px; color: #666; }
        .drop-zone-text { font-size: 16px; color: #333; margin: 8px 0; }

        .drop-zone-or { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
        .drop-zone-or::before, .drop-zone-or::after {
            content: '';
            flex: 1;
            height: 1px;
            background: red;
        }

        .button-row { display: flex; gap: 8px; }
        .header-actions { display: flex; justify-content: space-between; margin-bottom: 16px; }
        .form-section { display: flex; flex-direction: column; gap: 16px; }
        .add-button { margin-top: 16px; align-self: flex-end; }

        .back-button {
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            color: #00796b;
            font-weight: bold;
        }

        .file-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 8px;
            background: white;
        }

        .file-item img { width: 32px; height: 32px; margin-right: 8px; }
        .file-item-info { flex: 1; }
        .file-item-name { font-weight: bold; margin: 0; }
        .file-item-meta { font-size: 12px; color: #666; }
        .added-files { margin-top: 16px; margin-bottom: 16px; }
    `;

    constructor() {
        super();

        this.apiEndpoint = '';
        this.authToken = '';

        this.files = [];
        this.loading = false;
        this.error = '';

        this.modalOpen = false;
        this.isAddingFile = false;

        this.selectedFiles = null;
        this.addedFiles = [];

        this.label1 = '';
        this.label2 = '';

        // bind
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleModalClick = this.handleModalClick.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFileInput = this.onFileInput.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleAddFile = this.handleAddFile.bind(this);
        this.handleValidateAddedFiles = this.handleValidateAddedFiles.bind(this);
        this.uploadAllSelected = this.uploadAllSelected.bind(this);
    }

    _id(prefix) {
        if (globalThis.crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
        return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    _readValue(e) {
        return e?.target?.value ?? e?.detail?.value ?? '';
    }

    _openFilePicker() {
        this.renderRoot?.querySelector('input[type=file]')?.click();
    }

    handleOpenModal() {
        this.modalOpen = true;
        if (this.apiEndpoint && this.files.length === 0) this.fetchFiles();
    }

    async fetchFiles() {
        this.loading = true;
        this.error = '';

        try {
            const headers = new Headers();
            if (this.authToken) headers.set('Authorization', `Bearer ${this.authToken}`);

            const response = await fetch(this.apiEndpoint, { headers });
            if (!response.ok) throw new Error('Erreur réseau');

            const data = await response.json();

            this.files = (Array.isArray(data) ? data : []).map((doc) => {
                const byteString = atob(doc.content);
                const mimeType = doc.mimeType || 'application/octet-stream';

                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

                const blob = new Blob([ia], { type: mimeType });
                const url = URL.createObjectURL(blob);

                const fileObject = new File([blob], doc.libelle, { type: mimeType });


                return {
                    id: this._id('api'),
                    name: doc.libelle,
                    url,
                    mimeType,
                    blob: fileObject,
                    size: doc.taille,
                    originalBase64: doc.content,
                    selected: false,
                };
            });
        } catch (e) {
            this.error = e?.message ?? String(e);
        } finally {
            this.loading = false;
        }
    }

    onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        this.renderRoot?.querySelector('.drop-zone')?.classList.add('dragover');
    }

    onDragLeave() {
        this.renderRoot?.querySelector('.drop-zone')?.classList.remove('dragover');
    }

    onDrop(e) {
        e.preventDefault();
        this.renderRoot?.querySelector('.drop-zone')?.classList.remove('dragover');
        const files = e.dataTransfer?.files;
        if (files && files.length) {
            this.selectedFiles = files;
            this.handleAddFile();
        }
    }

    onFileInput(e) {
        const files = e?.target?.files;
        if (files && files.length) {
            this.selectedFiles = files;
            this.handleAddFile();
        }
    }

    handleAddClick() {
        this.isAddingFile = true;
        this.selectedFiles = null;
        this.label1 = '';
        this.label2 = '';
    }

    handleBackClick() {
        this.isAddingFile = false;
    }

    handleAddFile() {
        if (!this.selectedFiles || this.selectedFiles.length === 0) {
            alert('Veuillez sélectionner un fichier.');
            return;
        }

        const newAddedFiles = Array.from(this.selectedFiles).map((file) => ({
            id: this._id('local'),
            file,
            objectUrl: URL.createObjectURL(file),
        }));

        this.addedFiles = [...this.addedFiles, ...newAddedFiles];
        this.selectedFiles = null;
    }

    // handleValidateAddedFiles() {
    //   if (this.addedFiles.length === 0) {
    //     alert('Aucun fichier à valider.');
    //     return;
    //   }

    //   this.files = [
    //     ...this.files,
    //     ...this.addedFiles.map((f) => ({
    //       id: f.id,
    //       name: f.file.name,
    //       url: f.objectUrl,
    //       mimeType: f.file.type,
    //       size: f.file.size,
    //       selected: false,
    //     })),
    //   ];

    //   this.addedFiles = [];
    //   this.isAddingFile = false;
    // }

    handleValidateAddedFiles() {
        if (this.addedFiles.length === 0) {
            alert('Aucun fichier à valider.');
            return;
        }

        this.files = [
            ...this.files,
            ...this.addedFiles.map((f) => ({
                id: f.id,
                name: f.file.name,
                url: f.objectUrl,
                blob: f.file, // <--- AJOUTE ÇA ICI (f.file contient l'objet File natif)
                mimeType: f.file.type,
                size: f.file.size,
                selected: true, // On le sélectionne par défaut puisqu'il vient d'être ajouté
            })),
        ];

        this.addedFiles = [];
        this.isAddingFile = false;
    }
    removeAddedFile(id) {
        this.addedFiles = this.addedFiles.filter((f) => f.id !== id);
    }

    handleCheckboxChange(fileId, checked) {
        this.files = this.files.map((f) => (f.id === fileId ? { ...f, selected: checked } : f));
    }

    async openFileInNewTab(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erreur de téléchargement');
            const blob = await response.blob();
            window.open(URL.createObjectURL(blob), '_blank');
        } catch (e) {
            alert('Erreur lors de l’ouverture du fichier : ' + (e?.message ?? String(e)));
        }
    }

    uploadAllSelected() {
        const selected = this.files.filter((f) => f.selected);
        if (selected.length === 0) {
            alert('Aucun fichier sélectionné.');
            return;
        }

        // On envoie le premier fichier sélectionné (le script legacy gère 1 par 1)
        const fileToUpload = selected[0].blob;

        this.dispatchEvent(new CustomEvent('file-selected', {
            detail: { file: fileToUpload },
            bubbles: true,
            composed: true
        }));

        this.closeModal();
    }

    getThumbnailForFileByMimeType(mimeType) {
        if (!mimeType) return 'https://cdn-icons-png.flaticon.com/512/3532/3532393.png';
        if (mimeType.includes('pdf')) return 'https://cdn-icons-png.flaticon.com/512/219/219980.png';
        if (mimeType.startsWith('image/')) return 'https://cdn-icons-png.flaticon.com/512/3532/3532151.png';
        return 'https://cdn-icons-png.flaticon.com/512/3532/3532393.png';
    }

    closeModal() {
        this.modalOpen = false;
        this.isAddingFile = false;
        this.addedFiles = [];
    }

    handleModalClick(e) {
        if (e.target === e.currentTarget) this.closeModal();
    }

    render() {
        return html`
      <div class="container">
        <md-outlined-button @click=${this.handleOpenModal}>Ouvrir le coffre-fort</md-outlined-button>

        ${this.modalOpen
            ? html`
              <div class="modal" @click=${this.handleModalClick}>
                <div class="modal-content">
                  <div style="display:flex; justify-content:flex-end; margin-bottom:8px;">
                    <md-icon-button @click=${this.closeModal}>
                      <md-icon>close</md-icon>
                    </md-icon-button>
                  </div>

                  ${this.loading
                ? html`<div class="centered"><md-circular-progress indeterminate></md-circular-progress></div>`
                : this.isAddingFile
                    ? html`
                          <div class="header-actions">
                            <md-text-button class="back-button" @click=${this.handleBackClick}>
                              <md-icon slot="icon">arrow_back</md-icon>
                              Retour
                            </md-text-button>
                            <md-outlined-button @click=${this.handleAddFile}>Ajouter</md-outlined-button>
                          </div>

                          <div style="max-height:400px; overflow-y:auto; padding:8px; border:1px solid #eee; border-radius:4px;">
                            <div
                              class="drop-zone"
                              @dragover=${this.onDragOver}
                              @dragleave=${this.onDragLeave}
                              @drop=${this.onDrop}
                              @click=${() => this._openFilePicker()}
                            >
                              <md-icon class="drop-zone-icon">upload</md-icon>
                              <p class="drop-zone-text">Glisser et déposer vos fichiers ici</p>
                              <div class="drop-zone-or">ou</div>
                              <md-text-button class="drop-zone-button" type="button">
                                Charger des fichiers
                                <md-icon slot="end">upload</md-icon>
                              </md-text-button>

                              <input type="file" multiple style="display:none;" @change=${this.onFileInput} />
                            </div>

                            <div class="added-files">
                              ${this.addedFiles.map(
                        (f) => html`
                                  <div class="file-item">
                                    <img src=${this.getThumbnailForFileByMimeType(f.file.type)} alt="Icone fichier" />
                                    <div class="file-item-info">
                                      <div class="file-item-name">${f.file.name}</div>
                                      <div class="file-item-meta">
                                        ${f.file.type || 'format_inconnu'} • ${(f.file.size / 1024).toFixed(1)} KB
                                      </div>
                                    </div>
                                    <md-icon-button @click=${() => this.removeAddedFile(f.id)}>
                                      <md-icon>delete</md-icon>
                                    </md-icon-button>
                                  </div>
                                `
                    )}
                            </div>

                            <div class="form-section">
                              <md-outlined-text-field
                                label="Date d'échéance"
                                helper-text="Helper Text"
                                .value=${this.label1}
                                @input=${(e) => (this.label1 = this._readValue(e))}
                              ></md-outlined-text-field>

                              <md-outlined-text-field
                                label="Pouet pouet"
                                helper-text="Helper Text"
                                .value=${this.label2}
                                @input=${(e) => (this.label2 = this._readValue(e))}
                              ></md-outlined-text-field>
                            </div>
                          </div>

                          <md-filled-button class="add-button" @click=${this.handleValidateAddedFiles}>Valider</md-filled-button>
                        `
                    : html`
                          <div class="header-actions">
                            <div><p>Si votre fichier ne figure pas dans la liste, vous pouvez l’ajouter</p></div>
                            <md-outlined-button @click=${this.handleAddClick}>Ajouter</md-outlined-button>
                          </div>

                          <md-list>
                            ${this.files.map(
                        (f) => html`
                                <md-list-item type="button" ?selected=${!!f.selected}>
                                  <md-checkbox
                                    slot="start"
                                    touch-target="wrapper"
                                    .checked=${!!f.selected}
                                    @input=${(e) => this.handleCheckboxChange(f.id, e.target?.checked ?? false)}
                                  ></md-checkbox>

                                  <img slot="start" style="width:56px" src=${this.getThumbnailForFileByMimeType(f.mimeType)} />
                                  <div slot="headline">${f.name || f.id}</div>

                                  <div class="button-row" slot="end">
                                    <md-icon-button
                                      @click=${(e) => {
                            e.stopPropagation();
                            this.openFileInNewTab(f.url);
                        }}
                                    >
                                      <md-icon>visibility</md-icon>
                                    </md-icon-button>
                                  </div>
                                </md-list-item>
                              `
                    )}
                          </md-list>

                          <md-filled-button class="add-button" @click=${this.uploadAllSelected}>Upload</md-filled-button>
                        `}
                </div>
              </div>
            `
            : null}
      </div>
    `;
    }
}

customElements.define('ge-file-selector', GeFileSelector);

export default GeFileSelector;
