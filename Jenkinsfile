pipeline {
    agent any
    environment {
        TEST_PORT = 4442
        PROD_PORT = 4448
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
                    sh "docker run -d -p 4448:4448 --name cicdcontainer-test golamrabbani3587/cicd:v1"
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
                    sh "docker rmi golamrabbani3587/cicd:v1"
                }
            }
        }

        stage('Check Production Docker Image And Remove If Exist') {
            steps {
                script {
                    def containerExists = sh(script: "docker ps -a --filter name=cicdcontainer --format '{{.Names}}'", returnStatus: true)
                    def imageExists = sh(script: "docker images -q golamrabbani3587/cicd:v1", returnStatus: true)
                    if (containerExists == 1) {
                        sh "docker stop cicdcontainer"
                        sh "docker rm cicdcontainer"
                    }

                    if (imageExists == 0) {
                        sh "docker rmi golamrabbani3587/cicd:v1"
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













// pipeline {
//     agent any

//     stages {
//         stage('Check Docker Image') {
//             steps {
//                 script {
//                     def containerExists = sh(script: "docker ps -a --filter name=cicdcontainer --format '{{.Names}}'", returnStatus: true)
//                     def imageExists = sh(script: "docker images -q golamrabbani3587/cicd:v1", returnStatus: true)

//                     if (containerExists == 0) {
//                          sh "docker stop cicdcontainer"
//                         sh "docker rm cicdcontainer"
//                     }

//                     if (imageExists == 0) {
//                         sh "docker rmi golamrabbani3587/cicd:v1"
//                     }
//                 }
//             }
//         }
//         stage('Build Docker Image') {
//             steps {
//                 sh "docker build -t golamrabbani3587/cicd:v1 ."
//             }
//         }

//         stage('Run Docker Image') {
//             steps {
//                 sh "docker run -d -p 4441:4441 --name cicdcontainer golamrabbani3587/cicd:v1"
//             }
//         }
        
//         stage('Test Docker Image') {
//             steps {
//                 sh "docker exec cicdcontainer npm test"
//             }
//         }

//         stage('Push Docker Image') {
//             steps {
//                 script {
//                     sh "echo 'Programming123#' | docker login -u golamrabbani3587 --password-stdin"
//                     sh "docker push golamrabbani3587/cicd:v1"
//                 }
//             }
//         }
//     }
// }
