import { create } from 'zustand';
import axios from 'axios';

const ROOT_URL = 'https://project-api-boycotting-injustice-1.onrender.com/api';
const CLEARBIT_ROOT_URL = 'https://autocomplete.clearbit.com/v1/companies/suggest?query=';

const useStore = create((set) => ({
  companies: [],
  popularCompanies: [],
  boycottedCompanies: [],
  isLoading: false,
  error: null,
  currentCompany: null,
  currentScannedCompany: null,

  resetError: () => {
    set({ error: null });
  },

  fetchAllCompanies: async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/records/companies`);
      set({ companies: response.data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching all companies:', error.message);
    }
  },

  fetchCompanyByName: async (companyName) => {
    try {
      console.log('FETCH COMPANY BY NAME');
      const response = await axios.get(`${ROOT_URL}/records/getCompanyInfo/${companyName}`);
      set({ currentCompany: response.data });
      console.log("RESPONSE: ", response.data);
    } catch (error) {
      if (error.response.status === 500) {
        set({ error: "Either no company was found with this name or an error occurred while retrieving the ethical performance info for this company. Verify your search query and try again." });
      } else {
        set({ error: error.message })
      }
      console.error('Error fetching company by name:', error.message);
    }
  },

  fetchPopularCompaniesByCategory: async (category) => {
    try {
      const response = await axios.get(`${ROOT_URL}/records/getPopularCompanies/${category}`);
      set({ popularCompanies: response.data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching popular companies by category:', error.message);
    }
  },

  fetchBoycottedCompaniesByCategory: async (category) => {
    try {
      const response = await axios.get(`${ROOT_URL}/records/getBoycottedCompanies/${category}`);
      set({ boycottedCompanies: response.data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching boycotted companies by category:', error.message);
    }
  },

  fetchCompanyByProductBarcode: async (barcode) => {
    try {
      const response = await axios.get(`${ROOT_URL}/records/getProductInfo/${barcode}`);
      set({ currentScannedCompany: response.data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error fetching boycotted companies by category:', error.message);
    }
  },

  resetCurrentScannedCompany: () => {
    set({ currentScannedCompany: null });
  },

  /* CITATION: Chatgpt was used to create this method */
  getCompanyUrl : async (company) => {
    try {
        const response = await axios.get(`${CLEARBIT_ROOT_URL}${company.companyName}`);
        const returnedCompanies = response.data;

        if (returnedCompanies.length !== 0) {
            const matchedCompany = returnedCompanies.find(currResponse =>
                currResponse.name.toLowerCase() === company.companyName.toLowerCase()
            );

            const url = matchedCompany ? matchedCompany.logo : (returnedCompanies[0] ? returnedCompanies[0].logo : null);

            console.log(url);
            if (url && (url !== company.logoImage)) {
                const recordFields = {
                    companyId: company._id,
                    productCategories: company.productCategories,
                    companyName: company.companyName,
                    name: company.name,
                    categorizedCategories: company.categorizedCategories,
                    overallScore: company.overallScore,
                    summary: company.summary,
                    logoImage: url
                };

                try {
                    const updateResponse = await axios.put(`${ROOT_URL}/records/companies/${company._id}`, recordFields);
                    console.log('Company record updated successfully:', updateResponse.data);
                } catch (error) {
                    set({ error: error.message });
                    console.error('Error updating the URL of a company in the database:', error.message);
                }
            }
        }
    } catch (error) {
        set({ error: error.message });
        console.error('Error fetching company URL from the Clearbit API:', error.message);
    }
  },
}));

export default useStore;
