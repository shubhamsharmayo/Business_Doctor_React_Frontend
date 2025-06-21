import React from 'react'
import { Button } from '../ui/button'
import ProgressControl from './ProgressControl'
import { useNavigate } from 'react-router';

const BusinessPlanProgress = ({progressItems}) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
    navigate("/client/chat");
  };


  return (
    <div>
        <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Business Plan Progress</h2>
                    <div className="flex items-center space-x-2">
                      
                      
                    </div>
                  </div>
        
                  {progressItems.map((item, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.title}</span>
                        <span
                          className={`${
                            item.status === "Completed"
                              ? "text-green-600"
                              : item.status === "In Progress"
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
        
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                        <Button varient="outline">
                          <ProgressControl/>
                        </Button>
                        
                      </div>
                    </div>
                  ))}
        
                  <div className="flex justify-between mt-6">
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
                      View Full Plan
                    </button>
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                      onClick={handleNavigate}
                    >
                      Continue with AI
                    </button>
                  </div>
                </div>
    </div>
  )
}

export default BusinessPlanProgress