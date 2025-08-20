import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../contexts/ContentContext';
import { LogOut, Save, Edit3, RefreshCw } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { content, updateContent, refreshContent, loading } = useContent();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const handleEdit = (section: string, data: any) => {
    setEditingSection(section);
    setEditData({ ...data });
  };

  const handleSave = async () => {
    if (!editingSection) return;
    
    try {
      setSaving(true);
      await updateContent(editingSection as any, editData);
      setEditingSection(null);
      setEditData({});
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditData({});
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateToolData = (toolIndex: number, field: string, value: string) => {
    const updatedTools = [...editData.tools];
    updatedTools[toolIndex] = { ...updatedTools[toolIndex], [field]: value };
    setEditData({ ...editData, tools: updatedTools });
  };

  const updateStepData = (stepIndex: number, field: string, value: string) => {
    const updatedSteps = [...editData.steps];
    updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], [field]: value };
    setEditData({ ...editData, steps: updatedSteps });
  };

  const updateReasonData = (reasonIndex: number, field: string, value: string) => {
    const updatedReasons = [...editData.reasons];
    updatedReasons[reasonIndex] = { ...updatedReasons[reasonIndex], [field]: value };
    setEditData({ ...editData, reasons: updatedReasons });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-[#D4AF37] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  const EditButtons = () => (
    <div className="flex space-x-3">
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#D4AF37] hover:bg-[#B8941F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50"
      >
        <Save className="h-4 w-4 mr-2" />
        {saving ? 'Saving...' : 'Save'}
      </button>
      <button
        onClick={handleCancel}
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
      >
        Cancel
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-serif font-bold text-[#0E0B0B]">
              Content Management Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshContent}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#360A2C] hover:bg-[#4A1539] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#360A2C]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6">
            
            {/* Header Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Header Section</h3>
                  <button
                    onClick={() => handleEdit('header', content.header)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                {editingSection === 'header' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                      <textarea
                        value={editData.subtitle || ''}
                        onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Supporting Text</label>
                      <textarea
                        value={editData.supportingText || ''}
                        onChange={(e) => setEditData({ ...editData, supportingText: e.target.value })}
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                      <input
                        type="text"
                        value={editData.ctaText || ''}
                        onChange={(e) => setEditData({ ...editData, ctaText: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <EditButtons />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Title:</strong> {content.header.title}</p>
                    <p><strong>Subtitle:</strong> {content.header.subtitle}</p>
                    <p><strong>Description:</strong> {content.header.description}</p>
                    <p><strong>Supporting Text:</strong> {content.header.supportingText}</p>
                    <p><strong>CTA:</strong> {content.header.ctaText}</p>
                  </div>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">About Section</h3>
                  <button
                    onClick={() => handleEdit('about', content.about)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                {editingSection === 'about' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description 1</label>
                      <textarea
                        value={editData.description1 || ''}
                        onChange={(e) => setEditData({ ...editData, description1: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description 2</label>
                      <textarea
                        value={editData.description2 || ''}
                        onChange={(e) => setEditData({ ...editData, description2: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <EditButtons />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Title:</strong> {content.about.title}</p>
                    <p><strong>Description 1:</strong> {content.about.description1}</p>
                    <p><strong>Description 2:</strong> {content.about.description2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Empire Tools Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Empire Tools Section</h3>
                  <button
                    onClick={() => handleEdit('empireTools', content.empireTools)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                {editingSection === 'empireTools' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={editData.subtitle || ''}
                          onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Tools</h4>
                      {editData.tools && editData.tools.map((tool: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 mb-3">Tool {index + 1}</h5>
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Title</label>
                              <input
                                type="text"
                                value={tool.title || ''}
                                onChange={(e) => updateToolData(index, 'title', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Subtitle</label>
                              <input
                                type="text"
                                value={tool.subtitle || ''}
                                onChange={(e) => updateToolData(index, 'subtitle', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Description</label>
                              <textarea
                                value={tool.description || ''}
                                onChange={(e) => updateToolData(index, 'description', e.target.value)}
                                rows={2}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Button Text</label>
                              <input
                                type="text"
                                value={tool.buttonText || ''}
                                onChange={(e) => updateToolData(index, 'buttonText', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <EditButtons />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Title:</strong> {content.empireTools.title}</p>
                    <p><strong>Subtitle:</strong> {content.empireTools.subtitle}</p>
                    <p><strong>Tools:</strong> {content.empireTools.tools.length} tools configured</p>
                  </div>
                )}
              </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">How It Works Section</h3>
                  <button
                    onClick={() => handleEdit('howItWorks', content.howItWorks)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                {editingSection === 'howItWorks' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title Script</label>
                        <input
                          type="text"
                          value={editData.titleScript || ''}
                          onChange={(e) => setEditData({ ...editData, titleScript: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Steps</h4>
                      {editData.steps && editData.steps.map((step: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 mb-3">Step {index + 1}</h5>
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Number</label>
                              <input
                                type="text"
                                value={step.number || ''}
                                onChange={(e) => updateStepData(index, 'number', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Title</label>
                              <input
                                type="text"
                                value={step.title || ''}
                                onChange={(e) => updateStepData(index, 'title', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Description</label>
                              <textarea
                                value={step.description || ''}
                                onChange={(e) => updateStepData(index, 'description', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <EditButtons />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Title:</strong> {content.howItWorks.title}</p>
                    <p><strong>Title Script:</strong> {content.howItWorks.titleScript}</p>
                    <p><strong>Steps:</strong> {content.howItWorks.steps.length} steps configured</p>
                  </div>
                )}
              </div>
            </div>

            {/* Why Women Love Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Why Women Love Section</h3>
                  <button
                    onClick={() => handleEdit('whyWomenLove', content.whyWomenLove)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                {editingSection === 'whyWomenLove' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={editData.subtitle || ''}
                          onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Reasons</h4>
                      {editData.reasons && editData.reasons.map((reason: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-800 mb-3">Reason {index + 1}</h5>
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Title</label>
                              <input
                                type="text"
                                value={reason.title || ''}
                                onChange={(e) => updateReasonData(index, 'title', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700">Description</label>
                              <textarea
                                value={reason.description || ''}
                                onChange={(e) => updateReasonData(index, 'description', e.target.value)}
                                rows={2}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <EditButtons />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Title:</strong> {content.whyWomenLove.title}</p>
                    <p><strong>Subtitle:</strong> {content.whyWomenLove.subtitle}</p>
                    <p><strong>Reasons:</strong> {content.whyWomenLove.reasons.length} reasons configured</p>
                  </div>
                )}
              </div>
            </div>

            {/* Final CTA Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Final CTA Section</h3>
                  <button
                    onClick={() => handleEdit('finalCTA', content.finalCTA)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                {editingSection === 'finalCTA' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                      <textarea
                        value={editData.subtitle || ''}
                        onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                      <input
                        type="text"
                        value={editData.ctaText || ''}
                        onChange={(e) => setEditData({ ...editData, ctaText: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Footer Text</label>
                      <input
                        type="text"
                        value={editData.footerText || ''}
                        onChange={(e) => setEditData({ ...editData, footerText: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm"
                      />
                    </div>
                    <EditButtons />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Title:</strong> {content.finalCTA.title}</p>
                    <p><strong>Subtitle:</strong> {content.finalCTA.subtitle}</p>
                    <p><strong>CTA:</strong> {content.finalCTA.ctaText}</p>
                    <p><strong>Footer:</strong> {content.finalCTA.footerText}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;