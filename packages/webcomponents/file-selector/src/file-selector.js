import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@material/web/list/list-item.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/progress/circular-progress.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';

@customElement('file-selector')
export class FileSelector extends LitElement {
  @property({ attribute: 'api-endpoint' }) apiEndpoint = '';
  @state() files = [];
  @state() loading = false;
  @state() error = '';
  @state() modalOpen = false;
  @state() isAddingFile = false;
  @state() selectedFiles = null;
  @state() addedFiles = [];
  @state() label1 = '';
  @state() label2 = '';

  static styles = css`
    .container {
      padding: 16px;
    }
    .error {
      color: red;
      margin-bottom: 8px;
    }
    md-list {
      max-height: 300px;
      overflow-y: auto;
      color: 'RED';
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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

    .centered {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

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

    .drop-zone.dragover {
      border-color: #00796b;
      background-color: #e0f2f1;
    }

    .drop-zone-icon {
      font-size: 32px;
      color: #666;
    }

    .drop-zone-text {
      font-size: 16px;
      color: #333;
      margin: 8px 0;
    }

    .drop-zone-or {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
    }

    .drop-zone-or::before,
    .drop-zone-or::after {
      content: '';
      flex: 1;
      height: 1px;
      background: red;
    }

    .drop-zone-button {
      margin-top: 8px;
    }

    .button-row {
      display: flex;
      gap: 8px;
    }

    .header-actions {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .info-labels {
      margin-top: 16px;
    }

    .add-button {
      margin-top: 16px;
      align-self: flex-end;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: #00796b;
      font-weight: bold;
    }

    /* Style pour les éléments sélectionnés */
    md-list-item[selected] {
      --md-list-item-container-color: #e3f2fd; /* Bleu clair */
    }

    /* Style pour les items de fichier ajoutés */
    .file-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 8px;
      background: white;
    }

    .file-item img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    .file-item-info {
      flex: 1;
    }

    .file-item-name {
      font-weight: bold;
      margin: 0;
    }

    .file-item-meta {
      font-size: 12px;
      color: #666;
    }

    .file-item-delete {
      color: #f44336;
      cursor: pointer;
    }

    .added-files {
      margin-top: 16px;
      margin-bottom: 16px;
    }
  `;

  handleOpenModal() {
    this.modalOpen = true;
    if (this.apiEndpoint && this.files.length === 0) {
      this.fetchFiles();
    }
  }

  async fetchFiles() {
    this.loading = true;
    this.error = '';
    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) throw new Error('Erreur réseau');
      this.files = await response.json();
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.shadowRoot.querySelector('.drop-zone')?.classList.add('dragover');
  }

  onDragLeave() {
    this.shadowRoot.querySelector('.drop-zone')?.classList.remove('dragover');
  }

  onDrop(e) {
    e.preventDefault();
    this.shadowRoot.querySelector('.drop-zone')?.classList.remove('dragover');

    if (e.dataTransfer.files) {
      this.selectedFiles = e.dataTransfer.files;
      this.handleAddFile();
    }
  }

  onFileInput(e) {
    const input = e.target;
    if (input.files) {
      this.selectedFiles = input.files;
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

  async handleAddFile() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const newAddedFiles = Array.from(this.selectedFiles).map(file => {
      const id = `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const objectUrl = URL.createObjectURL(file);
      return { id, file, objectUrl };
    });

    this.addedFiles = [...this.addedFiles, ...newAddedFiles];
    this.selectedFiles = null;
  }

  handleValidateAddedFiles() {
    if (this.addedFiles.length === 0) {
      alert('Aucun fichier à valider.');
      return;
    }

    this.files = [
      ...this.files,
      ...this.addedFiles.map(f => ({
        id: f.id,
        name: f.file.name,
        url: f.objectUrl,
      }))
    ];

    this.addedFiles = [];
    this.isAddingFile = false;
  }

  removeAddedFile(id) {
    this.addedFiles = this.addedFiles.filter(f => f.id !== id);
  }

  handleCheckboxChange(fileId, checked) {
    this.files = this.files.map(f => f.id === fileId ? { ...f, selected: checked } : f);
  }

  async openFileInNewTab(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur de téléchargement');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (e) {
      alert('Erreur lors de l’ouverture du fichier : ' + e.message);
    }
  }

  async uploadFile(url, name) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur de téléchargement');
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', blob, name);

      const uploadResponse = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        alert('Fichier uploadé avec succès !');
      } else {
        alert('Erreur lors de l’upload.');
      }
    } catch (e) {
      alert('Erreur lors de l’upload : ' + e.message);
    }
  }

  uploadAllSelected() {
    const selectedFiles = this.files.filter(f => f.selected);
    if (selectedFiles.length === 0) {
      alert('Aucun fichier sélectionné.');
      return;
    }

    alert(`Upload de ${selectedFiles.length} fichier(s) sélectionné(s)`);
  }

  render() {
    return html`
      <div class="container">
        <md-filled-button @click="${this.handleOpenModal}">
          Ouvrir le coffre-fort
        </md-filled-button>

        ${this.modalOpen ? html`
          <div class="modal">
            <div class="modal-content">
              ${this.loading
        ? html`<div class="centered"><md-circular-progress indeterminate></md-circular-progress></div>`
        : this.isAddingFile
            ? html`
                      <!-- Mode Ajout de fichier -->
                      <div class="header-actions">
                        <md-text-button class="back-button" @click="${this.handleBackClick}">
                          <md-icon slot="icon">arrow_back</md-icon>
                          Retour
                        </md-text-button>
                        <md-filled-button @click="${this.handleAddFile}">Ajouter</md-filled-button>
                      </div>
                      
                      <div style="max-height: 400px; overflow-y: auto; padding: 8px; border: 1px solid #eee; border-radius: 4px;">
                        <div class="drop-zone" @dragover="${this.onDragOver}" @dragleave="${this.onDragLeave}" @drop="${this.onDrop}" @click="${() => this.shadowRoot.querySelector('input[type=file]')?.click()}">
                          <md-icon class="drop-zone-icon">upload</md-icon>
                          <p class="drop-zone-text">Glisser et déposer vos fichiers ici</p>
                          <div class="drop-zone-or">ou</div>
                          <md-filled-button class="drop-zone-button" type="button">
                            Charger des fichiers
                            <md-icon slot="end">upload</md-icon>
                          </md-filled-button>
                          <input type="file" multiple style="display: none;" @change="${this.onFileInput}" />
                        </div>

                        <!-- Affichage des fichiers ajoutés -->
                        <div class="added-files">
                          ${this.addedFiles.map(f => html`
                            <div class="file-item">
                              <img src="${this.getThumbnailForFile(f.file.name)}" alt="Icone fichier" />
                              <div class="file-item-info">
                                <div class="file-item-name">${f.file.name}</div>
                                <div class="file-item-meta">${f.file.type || 'format_inconnu'} • ${(f.file.size / 1024).toFixed(1)} KB</div>
                              </div>
                              <md-icon-button @click="${() => this.removeAddedFile(f.id)}">
                                <md-icon>delete</md-icon>
                              </md-icon-button>
                            </div>
                          `)}
                        </div>

                        <div class="form-section">
                          <md-outlined-text-field label="Date d'échéance" helper-text="Helper Text" .value="${this.label1}" @input="${(e) => this.label1 = e.target.value}"></md-outlined-text-field>
                          <md-outlined-text-field label="Pouet pouet" helper-text="Helper Text" .value="${this.label2}" @input="${(e) => this.label2 = e.target.value}"></md-outlined-text-field>
                        </div>
                      </div>

                      <!-- Bouton Valider -->
                      <md-filled-button class="add-button" @click="${this.handleValidateAddedFiles}">Valider</md-filled-button>
                    `
            : html`
                      <!-- Mode Liste -->
                      <div class="header-actions">
                        <div>
                          <p>Si votre fichier ne figure pas dans la liste, vous pouvez l’ajouter</p>
                        </div>
                        <md-filled-button @click="${this.handleAddClick}">Ajouter</md-filled-button>
                      </div>
                      <md-list>
                        ${this.files.map(f => html`
                          <md-list-item type="button" ?selected="${f.selected}">
                            <md-checkbox
                              slot="start"
                              touch-target="wrapper"
                              .checked="${f.selected || false}"
                              @input="${(e) => this.handleCheckboxChange(f.id, e.target.checked)}"
                            ></md-checkbox>
                            <img slot="start" style="width: 56px" src="${this.getThumbnailForFile(f.name)}">
                            <div slot="headline">${f.name || f.id}</div>
                            <div class="button-row" slot="end">
                              <md-icon-button @click="${(e) => { e.stopPropagation(); this.openFileInNewTab(f.url); }}">
                                <md-icon>visibility</md-icon>
                              </md-icon-button>
                            </div>
                          </md-list-item>
                        `)}
                      </md-list>
                      <md-filled-button class="add-button" @click="${this.uploadAllSelected}">Upload</md-filled-button>
                    `}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  getThumbnailForFile(filename) {
    if (!filename) return 'https://cdn-icons-png.flaticon.com/512/219/219980.png';

    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      return 'https://cdn-icons-png.flaticon.com/512/219/219980.png';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      return 'https://cdn-icons-png.flaticon.com/512/3532/3532151.png';
    }
    return 'https://cdn-icons-png.flaticon.com/512/3532/3532393.png';
  }
}