import React from 'react';
import Credits from '../Credits';
import { getAllSubstudies } from '@/app/admin/utils';
import Editor from './editor/Editor';
import { StudyInfo } from '../StudyInfoCard';

interface SubstudyEditorProps {
  params?: {
    substudyID?: string;
  };
}

export default async function SubstudyEditor(props: SubstudyEditorProps) {
  const substudies = await getAllSubstudies();

  return (
    <>
      <Editor substudy={substudies.find((o: StudyInfo) => o.key === props.params?.substudyID)} />
      <Credits />
    </>
  );
};

