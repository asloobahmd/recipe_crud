import React from "react";
import { Link } from "react-router-dom";
import ActionBtns from "./ActionBtns";
import parse from "html-react-parser";

const Table = ({ recipes }) => {
  const truncateDescription = (text, numOfWords) => {
    const words = text.split(" ");

    if (words.length < numOfWords) {
      return text;
    }
    const truncatedArray = words.slice(0, numOfWords);

    const finaltext = truncatedArray.join(" ");
    return finaltext + "...";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ingredients
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/recipe/${recipe._id}`}>
                  <div className="text-sm font-medium text-gray-900">
                    {recipe.name}
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {truncateDescription(recipe.ingredients.join(", "), 3)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500 ">
                  {parse(truncateDescription(recipe?.description, 5))}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm flex font-medium">
                <ActionBtns recipeId={recipe._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
