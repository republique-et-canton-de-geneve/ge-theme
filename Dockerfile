FROM oci-release.devops.etat-ge.ch/ch/ge/common/middlewares/web/nginx.122-ubi9:1.0.1
USER root
COPY ./packages/website/dist/ /srv/www/html
COPY nginx.conf /etc/nginx/conf.d/site.conf
USER 1001
CMD nginx -g "daemon off;"
EXPOSE 8080
