import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../actions/category'
import './MenuHeader.css'
/**
* @author
* @function MenuHeader
**/

export const MenuHeader = (props) => {

  const category = useSelector(state => state.category)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderCategories = (categories) => {
    let returnVal = [];
    for (let category of categories) {
      returnVal.push(
        <li key={category.name}>
          {
            category.parentID ? <a
              href={`${category.slug}?cid=${category._id}&type=${category.type}`}>
              {category.name}
            </a> :
              <span>{category.name}</span>
          }
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }

    return returnVal;
  };

  return (
    <div className='menuHeader'>
      <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null}
      </ul>
    </div>
  )

}