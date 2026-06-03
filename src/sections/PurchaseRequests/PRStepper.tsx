'use client';

import {
  Box,
  Button,
  Card,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import LineItemsTable from './Forms/LineItems';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import PurchaseRequestForm from './Forms/BasicInformation';
import StylishDocumentUpload from './Forms/Attachment';
import { useAppSelector } from 'src/store/hooks';
import { useRouter } from 'next/navigation';

const steps = [
  'Basic Information',
  'Line Items',
  'Attachments',
];

export default function PRStepper() {
    const prData = useAppSelector(
  (state) => state.purchaseRequest
);
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

const handleSubmit = async () => {
  try {
    const payload = {
      strRequestNumber: `PR-${Date.now()}`,

      strTitle: prData.basicInfo.title,

      strDescription:
        prData.basicInfo.description,

      strCurrentStatusId:
        'status-id-123',

      strPriorityId:
        prData.basicInfo.priorityId,

      intEstimatedValue:
        Number(prData.basicInfo.estimatedValue),

      strCurrency:
        prData.basicInfo.currency,

      strRequestedById:
        'user-id-123',

      strDepartmentId:
        prData.basicInfo.departmentId,

      strCategoryId:
        prData.lineItems[0]?.categoryId || '',

      strCreatedId:
        'user-id-123',

      arrItems: prData.lineItems.map((item) => ({
        strItemId: item.itemId,
        intQuantity: item.quantity,
      })),
    };

    console.log('FINAL PAYLOAD');
    console.log(payload);

    // await dispatch(createPurchaseRequest(payload));

    // alert('Purchase Request Submitted');
    router.push('/purchase-requests')

    // dispatch(resetPurchaseRequest());

  } catch (error) {
    console.error(error);
  }
};

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <PurchaseRequestForm />;

      case 1:
        return <LineItemsTable />;

      case 2:
        return <StylishDocumentUpload />;

      default:
        return null;
    }
  };

  return (
    <Box >
<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  }}
>
  <PremiumBreadcrumbs
    title="Purchase Requests"
    paths={[
      { label: 'Home', href: '/dashboard' },
      { label: 'PR', href: '/purchase-requests/purchase-request' },
    ]}
  />

  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button
      disabled={activeStep === 0}
      onClick={handleBack}
      variant="outlined"
              color="primary"

      sx={{
        textTransform: 'none',
        fontWeight: 600,
                  borderRadius:0.5

      }}
    >
      Previous
    </Button>

    {activeStep < steps.length - 1 ? (
      <Button
        variant="contained"
        onClick={handleNext}
                color="primary"

        sx={{
          textTransform: 'none',
          fontWeight: 600,
                    borderRadius:0.5

        }}
      >
        Next
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          borderRadius:0.5
        }}
      >
        Submit Purchase Request
      </Button>
    )}
  </Box>
</Box>

<Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />        
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
        //   border: '1px solid',
        //   borderColor: 'divider',
          overflow: 'hidden',
          boxShadow:0
        }}
      >

        {/* Stepper */}
        {/* <Box

        >
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  slotProps={{
                    label: {
                      sx: {
                        fontSize: 13,
                        fontWeight: 600,
                      },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box> */}

        {/* Step Content */}
<Box
  sx={{
    width: '100%',
    maxWidth:
      activeStep === 0 || activeStep === 2
        ? 800
        : '100%',
  }}
>
  {renderStepContent()}
</Box>


      </Card>
    </Box>
  );
}