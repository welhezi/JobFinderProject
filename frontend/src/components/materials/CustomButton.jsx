import { Button } from "@mui/material"

const CustomButton = ({title,onClick,icon,color}) => {
    return (
        <>
            <Button 
                variant="contained" 
                type="submit" 
                onClick={onClick} 
                startIcon={icon} 
                sx={{
                    backgroundColor: color, 
                    borderRadius: 2, 
                    textTransform: 'none', 
                    height:40,
                }}
            >
            {title}
            </Button>
        </>
    )
}

export {CustomButton}