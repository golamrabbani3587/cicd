pipeline {
    sh "echo 'Programming123#@'"
agent {
        docker { image 'node:16.0.0' }
    }
 stages {
        stage('Build') { 
            steps { 
                sh "docker build -t cicd:v1 ."
            }
        }
    }
}



// pipeline {
//     agent any
//     stages {
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     sh "docker build -t cicd:v1 ."
//                 }
//             }
//         }
        
//         stage('Test Docker Image') {
//             steps {
//                 script {
//                     sh "docker run cicd:v1 npm test"
//                 }
//             }
//         }
        
//         stage('Push Docker Image') {
//             steps {
//                 script {
//                     sh "echo 'Programming123#@' | docker login -u golamrabbani3587 --password-stdin"
//                     sh "docker push golamrabbani3587/cicd:v1"
//                 }
//             }
//         }
//         // stage('Deploy') {
//         //     steps {
//         //         script {
//         //             sshagent(credentials: ['SSH_PRIVATE_KEY_ID']) {
//         //                 sh "ssh -o StrictHostKeyChecking=no root@178.128.164.225 'bash -s' < deploy.sh"
//         //             }
//         //         }
//         //     }
//         // }
//     }
// }
