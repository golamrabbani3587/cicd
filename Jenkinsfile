node {
    stage('Build Docker Image') {
        sh "sudo -S docker build -t cicd:v1 ."
        echo 'Programming123##@'
    }
    
    stage('Test Docker Image') {
        sh "sudo -S docker run cicd:v1 npm test"
        echo 'Programming123##@'
    }
    
    stage('Push Docker Image') {
        withCredentials([string(credentialsId: 'DOCKER_REGISTRY_CREDENTIALS_ID', variable: 'DOCKER_CREDENTIALS')]) {
            sh "echo \$DOCKER_CREDENTIALS | sudo docker login -u golamrabbani3587 --password-stdin"
            sh "sudo docker push golamrabbani3587/cicd:v1"
        }
    }
    
    stage('Deploy') {
        def deployKey = credentials('SSH_PRIVATE_KEY_ID')
        sshagent([deployKey]) {
            when {
                expression {
                    currentBuild.resultIsBetterOrEqualTo('SUCCESS') && currentBuild.branchName == 'master'
                }
            }
            sh "ssh -o StrictHostKeyChecking=no root@178.128.164.225 'bash -s' < deploy.sh"
        }
    }
}
