import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';

interface SaveButtonPropsI {
  onClick: () => void;
  loading?: boolean;
  displayString: string;
}

export const SaveButton: FunctionComponent<SaveButtonPropsI> = ({ onClick, loading, displayString }) => {
  return (
    <>
      <Button disabled={loading} variant="contained" color="primary" onClick={onClick} disableElevation>
        {displayString}
      </Button>
    </>
  );
};
