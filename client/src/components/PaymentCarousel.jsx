import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import logo from "../assets/logo_white.svg"
import {RemoveRedEyeRounded, FileUploadRounded, SlideshowRounded} from '@mui/icons-material';
import NumberInputBasic from './NumberInput';

const AutoPlaySwipeableViews = (SwipeableViews);

function PaymentCarousel({setEyes,eyes}) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = 2;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                <div className=' text-secondary flex flex-col justify-center items-center gap-5 mb-5'>
                    <p className='uppercase font-semibold tracking-[10px] text-2xl text-accent'>Order Details</p>
                    <img src={logo} alt="" className='h-40 w-40' />
                    <NumberInputBasic value={eyes} setValue={setEyes}/>
                </div >
                <div className=' text-secondary flex flex-col justify-between h-full pb-10 items-center '>
                    <p className='uppercase font-semibold tracking-[10px] text-2xl text-accent'>pricing</p>
                    <div className='grid gap-10'>

                        <div className="grid grid-cols-3 items-center justify-center text-xl">
                            <RemoveRedEyeRounded />
                            <span className=''>1 Eye:
                            </span>
                                <span className='font-bold ml-5'>
                                    INR 0.50
                                </span>
                        </div>
                        <div className="grid grid-cols-3  items-center justify-center text-xl">
                            <FileUploadRounded />
                            <span>Upload:
                            </span>
                                <span className='font-bold ml-5'>
                                    15 Eyes
                                </span>
                        </div>
                        <div className="grid grid-cols-3 items-center justify-center text-xl">
                            <SlideshowRounded />
                            <span>View:
                            </span>
                                <span className='font-bold ml-5'>
                                    1 Eyes
                                </span>
                        </div>
                        
                    </div>

                </div>
            </AutoPlaySwipeableViews>
            <MobileStepper
                sx={{
                    bgcolor: "transparent",
                    opacity: "0.6",
                    '& .MuiMobileStepper-dot': {
                        backgroundColor: 'white',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: '#9D9FE2',
                    },
                }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{
                            '&.Mui-disabled': {
                                color: '#9D9FE2', // Ensuring disabled button text color is grey
                            },
                            color: activeStep === maxSteps - 1 ? '#9D9FE2' : 'white',
                            '.MuiButton-startIcon > *': {
                                color: activeStep === maxSteps - 1 ? '#9D9FE2' : 'white',
                            },
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.12)',
                            },
                        }}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}
                        sx={{
                            '&.Mui-disabled': {
                                color: '#9D9FE2', // Ensuring disabled button text color is grey
                            },
                            color: activeStep === 0 ? '#9D9FE2' : 'white',
                            '.MuiButton-startIcon > *': {
                                color: activeStep === maxSteps - 1 ? '#9D9FE2' : 'white',
                            },
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.12)',
                            },
                        }}
                    >

                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}

export default PaymentCarousel;