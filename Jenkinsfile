node {
    def appDir='/var/www/nextjs-app'

    stage('Clean Workspace'){
        echo 'Cleaning Jenkins Workspace'
        deleteDir()
    }

    stage('Clone Repo'){
        echo 'Cloning the repo'
        git(
            branch:'main',
            url:'https://github.com/suryapratap64/aws-ec2-next-cicd-pipeline-jenkins'
        )
    }

    stage('Deploy to EC2'){
        echo 'Deploying to ec2'
        sh """
            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            sudo rsync -av --delete \
                --exclude='.git' \
                --exclude='node_modules' \
                ./ ${appDir}/

            cd ${appDir}

            cd ${appDir}
            sudo npm install
          sudo npm run build
           sudo fuser -k 3000/tcp || true
            npm run start

        """
    }
}

// node {
//     def appDir='/var/www/nextjs-app'
//     stage('Clean Workspace'){
//         echo 'Cleaning Jenkins Workspace'
//         deleteDir()
//     }
//     stage('Clone Repo'){
//         echo 'Cloning the repo'
//         git(
//             branch:'main',
//             url:'https://github.com/suryapratap64/aws-ec2-next-cicd-pipeline-jenkins'
//         )
//     }
//     stage('Deploy to EC2'){
//         echo 'Deploying to ec2'
//         sh """
//           sudo mkdir -p ${appDir}
//           sudo chown -R
//           jenkins:jenkins ${appDir}
//           rsync -av --delete
//            --exclude='.git'
//            --exclude='node_modules' ./ ${appDir}

//            cd ${appDir}
//            sudo npm install
//            sudo npm run build
//            sudo fuser -k 3000/tcp || true
//            npm run start

        
//         """
//     }

// }