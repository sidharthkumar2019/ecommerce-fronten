import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: []
    },
    productDetails: {},
    loading: false,
    page: {},
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                page: action.payload
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};