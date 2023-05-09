import {
  Button,
  FormControl, MenuItem,
  Select, SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, {useState} from 'react';
import './CreateWork.css';
import {FileUploader} from 'react-drag-drop-files';
import {useNavigate} from 'react-router';
import {courses} from '../../data/filters';
import {routes} from '../../Root';

export const CreateWork = () => {
  const navigate = useNavigate();
  const [work, setWork] = useState('курсовая');
  const [course, setCourse] = useState('');
  const [workName, setWorkName] = useState('');
  const [files, setFile] = useState(null);

  const checkDisableSubmit = (): boolean => {
    return !work || !course || !workName;
  }

  const handleChangeWorkType = (
      event: React.MouseEvent<HTMLElement>,
      work: string,
  ) => {
    setWork(work);
  };

  const handleChangeDropdownCourses = (courseValue: SelectChangeEvent) => {
    setCourse(courseValue.target.value);
  }

  const handleChangeWorkName = (work: any) => {
    setWorkName(work.target.value)
  }

  const handleUploader = (fileUpload: React.SetStateAction<null>) => {
    setFile(fileUpload);
  }

  const onSubmit = (): void => {
    if (!checkDisableSubmit()) {
      let formResult = {
        typeWork: work,
        course: course,
        title: workName,
        files: files,
      };
      console.log(formResult);
      onExitForm();
    }
  }

  const onExitForm = (): void => {
    navigate(routes.works);
  }

  return (
      <>
        <h1 className="create-work__title h1">Создание работы</h1>
        <form className="create-work__form">
          <div className="create-work__form-field">
            <p>Вид работы</p>
            <ToggleButtonGroup
                color="primary"
                value={work}
                exclusive
                onChange={handleChangeWorkType}
                aria-label="Platform"
            >
              <ToggleButton value="курсовая">курсовая</ToggleButton>
              <ToggleButton value="диплом">диплом</ToggleButton>
              <ToggleButton value="доклад">доклад</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="create-work__form-field">
            <p>Курс</p>
            <FormControl sx={{minWidth: 208, marginRight: '15px'}}>
              <Select
                  displayEmpty
                  value={course}
                  onChange={handleChangeDropdownCourses}
              >
                <MenuItem disabled value="">
                  <em>курс</em>
                </MenuItem>
                {courses.map((item) => (
                    <MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="create-work__form-field">
            <p>Название работы</p>
            <TextField variant="outlined" value={workName} onChange={handleChangeWorkName}/>
          </div>
          <div className="create-work__form-field">
            <p>Загрузить файл</p>
            <FileUploader handleChange={handleUploader}
                          name="document"
                          multiple
                          label="Перетащите файл сюда или Нажмите, чтобы загрузить"/>
          </div>
        </form>
        <div className="create-work__form-control" onClick={onSubmit}>
          <Button variant="contained"
                  disabled={checkDisableSubmit()}
                  sx={{background: '#FDD05A', color: '#434D56'}}>Сохранить</Button>
          <Button variant="contained" sx={{background: '#FFF8E6', color: '#434D56'}} onClick={onExitForm}>
            Отмена
          </Button>
        </div>
      </>
  );
}