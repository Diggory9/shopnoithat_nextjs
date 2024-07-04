
import { MCategory } from "@/models/categorymodel";

import React from "react";
import { Drawer, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CartModel } from "@/models/cartmodel";
type RecursiveMenuProps = {

    categories: MCategory[],
    parentId: any,
    handleOnSelectCategory: (id: string) => void;
};
const RecursiveMenu: React.FC<RecursiveMenuProps> = ({ categories, parentId = null, handleOnSelectCategory }) => {
    return (
        <ul className={`dropdown-menu ${parentId ? 'w-full text-gray-700 dark:text-gray-300' : 'relative w-full'}`}>
            {categories
                .filter(category => category.categoryParent === parentId)
                .map(category => {
                    const hasChildren = categories.some(child => child.categoryParent === category.id);
                    return (

                        <li key={category.id} className="w-full relative">
                            <button
                                className="w-full rounded-t bg-gray-200 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 py-2block whitespace-no-wrap text-start"
                                onClick={() => handleOnSelectCategory(category.id)}
                            >
                                <div className="flex items-center mx-2 my-3">
                                    <span className="font-bold">{category.name} </span>
                                    {hasChildren && (
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    )}
                                </div>
                            </button>
                            {hasChildren && (
                                <RecursiveMenu
                                    categories={categories}
                                    parentId={category.id}
                                    handleOnSelectCategory={handleOnSelectCategory}
                                />
                            )}
                        </li>
                    )
                })}
        </ul>
    );
};

export default RecursiveMenu