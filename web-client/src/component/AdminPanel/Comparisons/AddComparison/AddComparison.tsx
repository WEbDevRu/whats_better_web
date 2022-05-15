import React, { useEffect, useState } from 'react';
import styles from './AddComparison.module.less';
import { useModal } from '../../../../hooks/useModal';
import { AutoComplete, Button, Form, Input, Modal, Select, Spin, Tag, Tooltip } from 'antd';
import { useTranslation } from '../../../../hooks/useTranslation';
import { NS_ADMIN_PANEL, NS_COMMON } from '../../../../const/NAMESPACES';
import { useRequest } from '../../../../hooks/useRequest';
import {
    API_ADD_COMPARISON,
    API_CATEGORIES_LIST,
    API_COMPARISON_ENTITY_SEARCH,
} from '../../../../const/http/API_URLS';
import { RequestMethods, RequestStatuses } from '../../../../const/http';
import { ComparisonEntities } from '../../../../types/comparisonEntity';
import { PlusOutlined } from '@ant-design/icons';
import TweenOneGroup from 'rc-tween-one/lib/TweenOneGroup';
import { Category } from '../../../../types/categories';

const { Option } = Select;

interface IProps {

}

const AddComparison: React.FC<IProps> = ({

}) => {
    const createModal = useModal();
    const [form] = Form.useForm();

    const { t } = useTranslation(NS_ADMIN_PANEL);
    const { t:tc } = useTranslation(NS_COMMON);

    const [categories, setCategories] = useState<Category[]>([]);

    const [categoriesOptions, setCategoriesOptions] = useState<{
        selectedOptions: Record<string, string>[],
        searchOptions: Record<string, string>[],
        searchValue?: string,
    }>({
        selectedOptions: [],
        searchOptions: [],
    });

    const {
        onRequest: handleSearchEntityCategory,
        state: searchResponse,
    } = useRequest({
        url: API_COMPARISON_ENTITY_SEARCH,
        method: RequestMethods.Get,
    });

    const {
        onRequest: handleAddComparison,
        state: addComparisonResponse,
    } = useRequest({
        url: API_ADD_COMPARISON,
        method: RequestMethods.Post,
    });

    const {
        onRequest: onLoadCategoriesList,
        state: loadCategoriesListRS,
    } = useRequest({
        url: API_CATEGORIES_LIST,
        method: RequestMethods.Get
    });

    useEffect(() => {
        onLoadCategoriesList({
            params: {
                page: 1,
                limit: 50,
            }
        });
    }, []);

    useEffect(() => {
        if (loadCategoriesListRS.status === RequestStatuses.Succeeded) {
            setCategories(loadCategoriesListRS.result.items);
        }
    }, [loadCategoriesListRS.status]);

    const handleSubmit = async () => {
        form.submit();
    };

    const handleFinish = async (values:Record<string, string>) => {
        handleAddComparison({
            data: {
                title: values.title,
                description: values.description,
                categoryId: values.category,
                type: Object.values(ComparisonEntities)[Object.keys(ComparisonEntities).indexOf(values.type as any)],
                entitiesId: categoriesOptions.selectedOptions.map((option) => option.id)
            }
        });
        createModal.onStartConfirmationLoading();
    };

    const onSearch = (searchText: string) => {
        handleSearchEntityCategory({
            params: {
                text: searchText
            }
        });
    };

    useEffect(() => {
        if (searchResponse.status === RequestStatuses.Succeeded) {
            const responseArr = Object.keys(searchResponse.result).map((key) => searchResponse.result[key]);
            const filteredArr = responseArr
                .filter((item) =>
                    !categoriesOptions.selectedOptions.map((selectedItem) => selectedItem.id).includes(item.id)
                );
            setCategoriesOptions((c) => ({
                ...c,
                searchOptions: filteredArr,
            }));
        }
    }, [searchResponse.status]);

    const handleSelect = (id:string) => {
        setCategoriesOptions((c) => {
            const searchIndex = c.searchOptions.findIndex((so) => so.id === id);

            if (searchIndex !== -1) {
                const currentCopy = { ...c };
                currentCopy.selectedOptions.push(currentCopy.searchOptions[searchIndex]);
                currentCopy.searchOptions.splice(searchIndex, 1);
                currentCopy.searchValue = '';

                return currentCopy;
            }
            return c;
        });
    };

    const handleDeleteEntityCategory = ({ comparisonEntityCategoryId }:{ comparisonEntityCategoryId: string }) => {
        setCategoriesOptions((c) => {
            const selectedIndex = c.selectedOptions.findIndex((so) => so.id === comparisonEntityCategoryId);

            if (selectedIndex !== -1) {
                const currentCopy = { ...c };
                currentCopy.selectedOptions.splice(selectedIndex, 1);

                return currentCopy;
            }
            return c;
        });
    };

    useEffect(() => {
        if (addComparisonResponse.status === RequestStatuses.Succeeded) {
            createModal.onClose();
            createModal.onStopConfirmationLoading();
            form.resetFields();
        }
    }, [addComparisonResponse.status]);

    return (
        <>
            <Button
                type="primary"
                onClick={createModal.onShow}
                icon={<PlusOutlined />}
            >
                Add Entity
            </Button>
            <Modal
                title="Add entity"
                visible={createModal.visible}
                onOk={handleSubmit}
                confirmLoading={createModal.confirmationLoading}
                onCancel={createModal.onClose}
            >
                <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    form={form}
                >
                    <Form.Item
                        label={t('categories.title.label')}
                        required
                        name='title'
                        rules={[{
                            required: true,
                            message: tc('formErrors.empty', { fieldName: t('categories.title.label') })
                        }]}
                    >
                        <Input placeholder={t('categories.title.placeholder')} />
                    </Form.Item>
                    <Form.Item
                        label={t('categories.description.label')}
                        name='description'
                    >
                        <Input placeholder={t('categories.description.placeholder')} />
                    </Form.Item>
                    <Form.Item
                        label='Category'
                        name='category'
                        required
                        rules={[{
                            required: true,
                            message: tc('formErrors.empty', { fieldName: 'Type' })
                        }]}
                    >
                        <Select>
                            {categories?.map((category) => (
                                <Option
                                    key={category.id}
                                >
                                    {category.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <TweenOneGroup
                        enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                        }}
                        onEnd={(e:any) => {
                            if (e.type === 'appear' || e.type === 'enter') {
                                if (e.target && e.target.style) {
                                    e.target.style = 'display: inline-block';
                                }
                            }
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {categoriesOptions.selectedOptions.map((category) => (
                            <span
                                key={category.id}
                                style={{ display: 'inline-block' }}
                            >
                                <Tooltip placement="topLeft" title={category.description}>
                                    <Tag
                                        closable={!category.isFetching}
                                        onClose={e => {
                                            e.preventDefault();
                                            handleDeleteEntityCategory({ comparisonEntityCategoryId: category.id as string });
                                        }}
                                        className={styles.tag}
                                    >
                                        {category.title}
                                        {category.isFetching && (
                                            <Spin
                                                size='small'
                                            />
                                        )}
                                    </Tag>
                                </Tooltip>

                            </span>
                        ))}
                    </TweenOneGroup>
                    <Form.Item
                        label='Categories'
                    >
                        <AutoComplete
                            allowClear
                            value={categoriesOptions.searchValue}
                            className={styles.categoriesSelect}
                            style={{ width: 200 }}
                            onChange={(value:string) => setCategoriesOptions((c) => ({
                                ...c,
                                searchValue: value,
                            }))}
                            onSearch={onSearch}
                            onSelect={handleSelect}
                            placeholder='Select tags'
                            options={categoriesOptions.searchOptions.map((option) => ({
                                value: option.id,
                                label: option.title,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default React.memo(AddComparison);
