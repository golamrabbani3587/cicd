pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sudo -S docker build -t cicd:v1 .
                    echo 'Programming123##@'
                }
            }
        }
        stage('Test Docker Image') {
            steps {
                script {
                    sh "sudo -S docker run cicd:v1 npm test"
                    sh "echo 'Programming123##@'"
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    sh "echo 'Programming123#@' | sudo docker login -u golamrabbani3587 --password-stdin"
                    sh "sudo docker push golamrabbani3587/cicd:v1"
                }
            }
        }
        
        stage('Deploy') {
            when {
                expression {
                    currentBuild.resultIsBetterOrEqualTo('SUCCESS') && currentBuild.branchName == 'master'
                }
            }
            steps {
                script {
                    sshagent(credentials: ['SSH_PRIVATE_KEY_ID']) {
                        sh "ssh -o StrictHostKeyChecking=no root@178.128.164.225 'bash -s' < deploy.sh"
                    }
                }
            }
        }
    }
}