import React, { useContext, useState, FunctionComponent } from 'react';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH } from './Nav';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabFlex: {
      width: DRAWER_WIDTH
    },
    tabChildRoot: {
      minWidth: '50%'
    }
  })
);

const FiltersCard: FunctionComponent<any> = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  return (
    <div>
      <Tabs value={value} onChange={ handleChange }  className={ classes.tabFlex } centered={ true }>
        <Tab label="Projects" classes={{ root: classes.tabChildRoot }}/>
        <Tab label="Tags" classes={{ root: classes.tabChildRoot }}/>
      </Tabs>
      <div>
        { value === 0 ? <Typography>Projects</Typography> : null }
        { value === 1 ? <Typography>Tags</Typography> : null }
      </div>
    </div>
  )
};

export default FiltersCard;
