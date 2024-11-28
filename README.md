# Ethical Audit

Our project provides consumers with an intuitive platform for making informed purchasing decisions. Whether searching by company name or scanning a product barcode, users gain access to detailed ethical scores across six critical categories: climate sustainability, human rights violations, child labor practices, livable wages, diversity, equity, and inclusion (DEI), and animal cruelty. By having these scores readily available, consumers can align their purchases with their values, supporting companies that prioritize ethical practices and driving positive social and environmental impact.

## Architecture

Our project employs React Native for the frontend and features a backend API crafted with React, Express, and Node.js, supported by a MongoDB database.
We integrate three distinct external APIs:

 - OpenAI API: This assists in generating comprehensive data on companies, including their ethical scores across various categories.
 - Clearbit API: Utilized for fetching company logos.
 - Barcode Lookup API: Enables retrieval of product information, including the manufacturer's name, based on a product's barcode number.

Please note that our app uses ChatGPT to generate responses that fit a predefined schema in the backend. If ChatGPT's response doesn't match the expected schema, the app makes another request. However, despite these efforts, sometimes ChatGPT still doesn't follow the schema. As a result, when you use the search bar or scan a product, you might encounter an error message asking you to rescan or re-research the product or company name.

Also note that our search implementation may not seem intuitive initially, so here's an explanation. As you type in the search bar, the app looks for potential matches within the companies stored in our database. However, when you press 'return' on the mobile keyboard or click the arrow icon to the right of the search bar, the app sends a request to ChatGPT for the company name. The app will not make a ChatGPT request otherwise. This process can take a few minutes to complete as the API fetches the data, compared to the faster local database filtering.

## Setup

1. Clone this repository.
2. Run `yarn install` to install all required dependencies.
3. Use the final version we published for the app by clicking the link [here](https://expo.dev/preview/update?message=final%20submission&updateRuntimeVersion=1.0.0&createdAt=2024-06-04T05%3A11%3A37.162Z&slug=exp&projectId=77b23a4e-a6a3-465f-9d5e-777b30880b04&group=80673421-0914-4a1e-a6e3-428a83beacfc), or run `eas update --branch "main" --message "Testing final project"` if you wish to publish your own versionon Expo.
4. Open the link obtained from step 3 and click on **Preview** to get a QR code for our project mobile app. You have to make sure to have the Expo Go app installed on your phone.
 - For iPhone users: Use your camera to scan the QR code. It will open our project's mobile app.
 - For Android users: Open the Expo Go app, then scan the QR code by clicking on the 'Scan QR code' option. It will open our project's mobile app.
 - If prompted to sign into Expo Go, use the following email credentials:
   - Email: boycott.injustice.52@gmail.com
   - Email Password: Kurwanya$Akarengane@IsiYose#2024

## Deployment

Our project is currently published on Expo. To explore it, simply click [here](https://expo.dev/preview/update?message=testing&updateRuntimeVersion=1.0.0&createdAt=2024-05-27T17%3A30%3A18.483Z&slug=exp&projectId=77b23a4e-a6a3-465f-9d5e-777b30880b04&group=d53e070d-0bcc-47f2-9305-b304331ac3e2) and follow the instructions provided in Step 4 of the **Setup** section above.

Please note that our backend API is hosted on **render.com**. Since we are using Render's free version, there might be a slight delay of around 10 seconds up until a minute for the information to fully load on our app's homepage when you first access it.

## Authors

* Aya Hajjeh
* Dahlia Igiraneza
* Jennifer Zhao
* Marvin Escobar Barajas
* Tasnim Chowdhury

## Acknowledgments

- Tim Tregubov
- All sources utilized in our project are duly credited within the source code files of the corresponding pages.
