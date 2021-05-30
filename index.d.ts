import './index.scss';
import React from 'react';
declare type AutoTagsProps = {
    suggestions: [string];
    id: string;
    style: object;
    register: (value: string) => void;
    name: string;
    placeholder: string;
};
declare const ReactAutoTags: React.ForwardRefExoticComponent<AutoTagsProps & React.RefAttributes<any>>;
export default ReactAutoTags;
