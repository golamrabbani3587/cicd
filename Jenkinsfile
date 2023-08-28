pipeline {
    agent any
    environment {
        TEST_PORT = 4448
        PROD_PORT = 2540
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo '==>Building Test Container....'
                    sh 'docker build -t golamrabbani3587/cicd:v1 .'
                    echo '==>Test Container Build Success.'
                }
            }
        }
        stage('Run Tag Docker Image') {
            steps {
                script {
                    echo '==>Adding Tag Test Container....'
                    sh 'docker tag golamrabbani3587/cicd:v1 test-golamrabbani3587/cicd:v1'
                    echo '==>tag AddedTest On Container Running.'
                }
            }
        }
        
        stage('Run Test Docker Image') {
            steps {
                script {
                    echo '==>Running Test Container....'
                    sh "docker run -d -p $TEST_PORT:$TEST_PORT --name cicdcontainer-test --env-file .env test-golamrabbani3587/cicd:v1"
                    echo '==>Test Container Running.'
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    echo '==>Running Test Cases....'
                    sh 'docker exec cicdcontainer-test npm test'
                }
            }
        }

        stage('Remove test docker image') {
            steps {
                script {
                    echo '==>Removing Test Container And Image....'
                    sh 'docker stop cicdcontainer-test'
                    sh 'docker rm cicdcontainer-test'
                    sh """docker rmi -f \$(docker images 'test-golamrabbani3587/cicd' -a -q)"""
                    echo '==>Removed Test Container And Image'
                }
            }
        }
        stage('Check Production Docker Image And Remove If Exist') {
            steps {
                script {
                    def containerExistsOutput = sh(script: "docker ps -a --filter name=cicdcontainer --format '{{.Names}}'", returnStdout: true).trim()
                    def imageExistsOutput = sh(script: "docker images -q golamrabbani3587/cicd", returnStdout: true).trim()

                    if (containerExistsOutput) {
                        echo "Container exists. Stopping and removing..."
                        sh "docker stop cicdcontainer"
                        sh "docker rm cicdcontainer"
                    } else {
                        echo "Container does not exist."
                    }
                    if (imageExistsOutput) {
                        echo "Image exists. Removing..."
                        sh """docker rmi -f \$(docker images 'golamrabbani3587/cicd' -a -q)"""
                    } else {
                        echo "Image does not exist."
                    }
                }
            }
        }
        stage('Run Docker Image') {
            steps {
                echo '==>Running Production Container...'
                sh "docker run -d -p $PROD_PORT:$PROD_PORT --name cicdcontainer --env-file .env golamrabbani3587/cicd:v1"
                echo '==>Successfully Running.'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo '==>Pushing golamrabbani3587/cicd:v1 Container to Docker Hub'
                    sh "echo 'Programming123#' | docker login -u golamrabbani3587 --password-stdin"
                    sh 'docker push golamrabbani3587/cicd:v1'
                    echo '==>Push Success'
                }
            }
        }
    }
}
