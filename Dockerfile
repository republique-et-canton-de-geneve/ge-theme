FROM oci-release.devops.etat-ge.ch/ch/ge/common/middlewares/web/nginx1.26-ubi10:1.0.9-20250924_143914
USER root
COPY ./build/ /srv/www/html
COPY nginx.conf /etc/nginx/conf.d/site.conf
USER 1001
CMD nginx -g "daemon off;"
EXPOSE 8080
