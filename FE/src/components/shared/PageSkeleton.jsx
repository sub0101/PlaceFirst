import React from 'react';
import { Layout, Skeleton, Space, Card } from 'antd';

const { Content } = Layout;

const PageSkeleton = ({ layout = 'default', itemCount = 5 }) => {
  const renderHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <Skeleton.Input style={{ width: 200 }} active size="large" />
      <Skeleton.Input style={{ width: 150 }} active />
    </div>
  );

  const renderFilters = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <Skeleton.Input style={{ width: 200 }} active />
      <Skeleton.Input style={{ width: 200 }} active />
    </div>
  );

  const renderTableContent = () => (
    <div className="space-y-4">
      {[...Array(itemCount)].map((_, index) => (
        <Skeleton key={index} active paragraph={{ rows: 1 }} />
      ))}
    </div>
  );

  const renderCardContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(itemCount)].map((_, index) => (
        <Card key={index} className="w-full">
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </Card>
      ))}
    </div>
  );

  const renderFormContent = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Skeleton.Input style={{ width: '100%' }} active size="large" />
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Skeleton.Input style={{ width: '100%' }} active />
        <Skeleton.Input style={{ width: '100%' }} active />
        <Skeleton.Input style={{ width: '100%' }} active />
      </Space>
      <Skeleton.Button style={{ width: 120 }} active size="large" />
    </div>
  );

  const renderDetailContent = () => (
    <div className="max-w-3xl mx-auto">
      <Card>
        <Skeleton avatar paragraph={{ rows: 4 }} active />
      </Card>
      <div className="mt-8 space-y-6">
        <Card>
          <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
        <Card>
          <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (layout) {
      case 'table':
        return renderTableContent();
      case 'card':
        return renderCardContent();
      case 'form':
        return renderFormContent();
      case 'detail':
        return renderDetailContent();
      default:
        return renderTableContent();
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-4 sm:p-6 lg:p-8">
        {renderHeader()}
        {renderFilters()}
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default PageSkeleton;