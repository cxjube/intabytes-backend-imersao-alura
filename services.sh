gcloud services enable run.googleapis.com
# Habilita a API do Cloud Run. Essa API permite que você execute containers sem servidor no GCP. É ideal para executar serviços web escaláveis e sem a necessidade de gerenciar infraestrutura.

gcloud services enable cloudbuild.googleapis.com
# Habilita a API do Cloud Build. Essa API é utilizada para criar e gerenciar pipelines de construção contínua. Com ela, você pode automatizar a construção, o teste e a implantação de seus aplicativos.

gcloud services enable artifactregistry.googleapis.com
# Habilita a API do Artifact Registry. Essa API fornece um repositório universal para armazenar e gerenciar pacotes de software, como Docker containers, npm packages, Maven artifacts e muitos outros.