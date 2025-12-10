import React, { useState } from 'react';
import { FileText, ChevronDown, Plus, Search, Settings, Menu, Star, Clock, Trash2 } from 'lucide-react';

interface Block {
    id: string;
    type: 'title' | 'heading' | 'text' | 'bullet';
    content: string;
}

const NotionClone: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [blocks, setBlocks] = useState<Block[]>([
        { id: '1', type: 'title', content: 'Untitled' },
        { id: '2', type: 'heading', content: 'Getting Started' },
        { id: '3', type: 'text', content: 'Start writing with a blank page...' },
    ]);

    const updateBlock = (id: string, content: string) => {
        setBlocks(blocks.map(block =>
            block.id === id ? { ...block, content } : block
        ));
    };

    const addBlock = () => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type: 'text',
            content: '',
        };
        setBlocks([...blocks, newBlock]);
    };

    return (
        <div className="flex h-screen bg-white text-gray-800">
            <div className="pointer-events-none absolute top-0 right-0 h-full bg-white blur-md opacity-70"></div>

            <div className="pointer-events-none absolute bottom-0 left-0 w-full bg-white blur-md opacity-70"></div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="h-12 border-b border-gray-200 flex items-center px-4 gap-2">
                    <div className='h-4 w-4 bg-red-500 rounded-full'></div>
                    <div className='h-4 w-4 bg-yellow-500 rounded-full'></div>
                    <div className='h-4 w-4 bg-green-500 rounded-full'></div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-24 py-12">
                        {/* Icon and Cover Placeholder */}
                        <div className="mb-8">
                            <button className="text-6xl mb-2 hover:bg-gray-100 rounded px-2 py-1">
                                📝
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                                Add cover
                            </button>
                        </div>

                        {/* Content Blocks */}
                        <div className="space-y-1">
                            {blocks.map((block, index) => (
                                <ContentBlock
                                    key={block.id}
                                    block={block}
                                    onChange={(content) => updateBlock(block.id, content)}
                                    autoFocus={index === blocks.length - 1}
                                />
                            ))}

                            <button
                                onClick={addBlock}
                                className="flex items-center gap-2 text-gray-400 hover:bg-gray-50 rounded px-2 py-1 text-sm w-full"
                            >
                                <Plus size={16} />
                                <span>Click to add a block</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({
    icon,
    label,
    active = false
}) => (
    <div className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm ${active ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-200'
        }`}>
        {icon}
        <span>{label}</span>
    </div>
);

const ContentBlock: React.FC<{
    block: Block;
    onChange: (content: string) => void;
    autoFocus?: boolean;
}> = ({ block, onChange, autoFocus }) => {
    const getClassName = () => {
        switch (block.type) {
            case 'title':
                return 'text-4xl font-bold outline-none w-full placeholder-gray-300';
            case 'heading':
                return 'text-2xl font-semibold outline-none w-full mt-6 placeholder-gray-300';
            case 'bullet':
                return 'text-base outline-none w-full pl-6 placeholder-gray-300';
            default:
                return 'text-base outline-none w-full placeholder-gray-300';
        }
    };

    const getPlaceholder = () => {
        switch (block.type) {
            case 'title':
                return 'Untitled';
            case 'heading':
                return 'Heading';
            default:
                return "Type '/' for commands";
        }
    };

    return (
        <div className="relative group">
            {block.type === 'bullet' && (
                <span className="absolute left-0 top-0 text-gray-400">•</span>
            )}
            <input
                type="text"
                value={block.content}
                onChange={(e) => onChange(e.target.value)}
                className={getClassName()}
                placeholder={getPlaceholder()}
                autoFocus={autoFocus}
            />
        </div>
    );
};

export default NotionClone;