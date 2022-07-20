import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        width: '90%'
    },
    page: {
        padding: 20,
        flexGrow: 1,
    },
    formLabel: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center'
    }
}));

const FilterByCheckBoxes = ({ formGroupLabel, checkBoxes, setCheckboxesState }) => {
    const classes = useStyles();

    const handleChange = index => event => {
        let checkBoxesCurrent = [...checkBoxes];
        checkBoxesCurrent[index].isChecked = event.target.checked;

        setCheckboxesState(checkBoxesCurrent);
    };

    return (
        <React.Fragment>
            <Paper square className={classes.page}>
                <Grid container spacing={5}>

                    <FormGroup row className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>
                            {formGroupLabel}
                        </FormLabel>

                        {checkBoxes && checkBoxes.map((checkBox, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={checkBox.isChecked}
                                        onChange={handleChange(index)}
                                        name={checkBox.name}
                                        color="primary"
                                    />
                                }
                                label={checkBox.label}
                            />
                        ))}
                    </FormGroup>
                </Grid>
            </Paper>
        </React.Fragment>
    );
};

export default FilterByCheckBoxes;