docker pull golamrabbani3587/cicd:v1
docker build -t cicd:v1 .
docker run -d -p 3000:3000 cicd:v1

