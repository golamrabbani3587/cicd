pipeline {
    agent any
    environment {
        TEST_PORT = 4448
        PROD_PORT = 4441
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t golamrabbani3587/cicd:v1 ."
                }
            }
        }

        stage('Run Test Docker Image') {
            steps {
                script {
                    sh "docker run -d -p $TEST_PORT:$TEST_PORT --name cicdcontainer-test --env-file .env golamrabbani3587/cicd:v1"
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    sh "docker exec cicdcontainer-test npm test"
                }
            }
        }

        stage('Remove test docker image'){
            steps {
                script {
                    sh "docker stop cicdcontainer-test"
                    sh "docker rm cicdcontainer-test"
                    sh "docker rmi $(docker images 'golamrabbani3587/cicd' -a -q)"
                }
            }
        }
stage('Check Production Docker Image And Remove If Exist') {
    steps {
        script {
            def containerExistsStatus = sh(script: "docker ps -a --filter name=cicdcontainer --format '{{.Names}}'", returnStatus: true)
            def imageExistsStatus = sh(script: "docker images -q golamrabbani3587/cicd:v1", returnStatus: true)

            if (containerExistsStatus == 0) {
                echo "Container exists. Stopping and removing..."
                sh "docker stop cicdcontainer"
                sh "docker rm cicdcontainer"
            } else {
                echo "Container does not exist."
            }

            if (imageExistsStatus == 0) {
                echo "Image exists. Removing..."
                sh "docker rmi $(docker images 'golamrabbani3587/cicd' -a -q)"
            } else {
                echo "Image does not exist."
            }
        }
    }
}

        stage('Run Docker Image') {
            steps {
                sh "docker run -d -p $PROD_PORT:$PROD_PORT --name cicdcontainer --env-file .env golamrabbani3587/cicd:v1"
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    sh "echo 'Programming123#' | docker login -u golamrabbani3587 --password-stdin"
                    sh "docker push golamrabbani3587/cicd:v1"
                }
            }
        }
    }
}
