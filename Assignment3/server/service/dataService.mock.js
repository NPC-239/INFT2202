import animalData from '../data/product.js'

function dataService(collectionName) {
    return {
        delete: async (name = null) => {
        },
        add: async (list) => {
        },
        update: async (record) => {
        },        
        query: async (name) => {
        },
        load: async ({ page = 1, perPage = 5 }) => {
            try {
                return new Promise((resolve, reject) => {
                    setTimeout(function () {
                        let pagination = {
                            page: page,
                            perPage: perPage,
                            pages: Math.ceil(productData.length / perPage)
                        }
                        let start = (pagination.page - 1) * perPage;
                        let end = start + perPage;
                        resolve({
                            records: productData.slice(start, end),
                            pagination
                        });
                    }, 500);
                });

            } finally {
            }
        }
    }
}

export default dataService;