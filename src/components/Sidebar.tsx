import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'; // Gear icon for settings
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

    return (
        <div className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
            {/* Sidebar Header */}
            <div>
                <div className="bg-gray-900 h-20 p-6">
                    <Link to="/" className="text-4xl font-bold">Vito Pizza</Link>
                </div>
                <div className="px-4">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/item-management" className="block p-2 hover:bg-gray-700 rounded">
                                Item Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/invoice-management" className="block p-2 hover:bg-gray-700 rounded">
                                Invoice Management
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Sidebar Footer */}
            <div className="flex items-center px-8">
                <FaCog size={20} className="text-white" />
                <span className="block p-2 text-center text-2xl items-center px-4">Settings</span>
                <button
                    onClick={openSettings}
                    className="p-2 hover:bg-gray-700 rounded-full"
                    aria-label="Open Settings"
                />
            </div>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Settings</h2>
                        <p className="mb-4">This is the settings popup/modal.</p>
                        <button
                            onClick={closeSettings}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
