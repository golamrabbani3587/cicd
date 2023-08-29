pipeline {
    agent any
    environment {
        TEST_PORT = 4448
        PROD_PORT = 9540
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo '==>Building Test Container....'
                    sh 'docker build -t jenkinscicd .'
                    echo '==>Test Container Build Success.'
                }
            }
        }
        stage('Run Tag Docker Image') {
            steps {
                script {
                    echo '==>Adding Tag Test Container....'
                    sh 'docker tag jenkinscicd jenkinscicd:test'
                    echo '==>Tag Added Test Container.'
                }
            }
        }
        stage('Run Test Docker Image') {
            steps {
                script {
                    echo '==>Running Test Container....'
                    sh "docker run -d -p $TEST_PORT:$TEST_PORT --name jenkinscicd-test --env-file .env jenkinscicd:test"
                    echo '==>Test Container Running.'
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    echo '==>Running Test Cases....'
                    sh 'docker exec jenkinscicd-test npm test'
                }
            }
        }

        stage('Remove test docker image') {
            steps {
                script {
                    echo '==>Removing Test Container And Image....'
                    sh 'docker stop jenkinscicd-test'
                    sh 'docker rm jenkinscicd-test'
                    sh """docker rmi -f \$(docker images 'jenkinscicd:test' -a -q)"""
                    echo '==>Removed Test Container And Image'
                }
            }
        }

        stage('Check Production Docker Image And Remove If Exist') {
            steps {
                script {
                    def containerExistsOutput = sh(script: "docker ps -a --filter name=jenkinscicd --format '{{.Names}}'", returnStdout: true).trim()
                    def imageExistsOutput = sh(script: 'docker images -q golamrabbani3587/jenkinscid', returnStdout: true).trim()

                    if (containerExistsOutput) {
                        echo 'Container exists. Stopping and removing...'
                        sh 'docker stop jenkinscicd'
                        sh 'docker rm jenkinscicd'
            } else {
                        echo 'Container does not exist.'
                    }
                    if (imageExistsOutput) {
                        echo 'Image exists. Removing...'
                        sh """docker rmi -f \$(docker images 'golamrabbani3587/jenkinscid' -a -q)"""
            } else {
                        echo 'Image does not exist.'
                    }
                }
            }
        }

        stage('Build Production Docker Image') {
            steps {
                echo '==>Building Production Container...'
                sh 'docker build -t golamrabbani3587/jenkinscicd:v1 .'
                echo '==>Successfully Build.'
            }
        }

        stage('Run Docker Image') {
            steps {
                echo '==>Running Production Container...'
                sh "docker run -d -p $PROD_PORT:$PROD_PORT --name jenkinscicd --env-file .env golamrabbani3587/jenkinscicd:v1"
                echo '==>Successfully Running.'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo '==>Pushing golamrabbani3587/jenkinscicd:v1 Container to Docker Hub'
                    sh "echo 'Programming123#' | docker login -u golamrabbani3587 --password-stdin"
                    sh 'docker tag golamrabbani3587/jenkinscicd:v1 golamrabbani3587/jenkinscicd'
                    sh 'docker push golamrabbani3587/jenkinscicd:v1'
                }
            }
        }
    }
}
