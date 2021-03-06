import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (parentID, categories, category) => {
    let newCategories = [];

    if (parentID == undefined) {
        return [
            ...categories,
            {
                id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for (let ele of categories) {
        if (ele._id == parentID) {
            newCategories.push({
                ...ele,
                children: ele.children ? buildNewCategories(parentID, [...ele.children,{
                    id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentID: category.parentID,
                    children: category.children
                }], category) : []
            });
        }
        else {
            newCategories.push({
                ...ele,
                children: (ele.children && ele.children.length > 0) ? buildNewCategories(parentID, ele.children, category) : []
            });
        }
    }

    return newCategories;
}

export default (state=initialState, action) => {
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
    }

    return state;
}