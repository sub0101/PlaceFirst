import React, { useState } from 'react';
import { Form, Button, Typography } from 'antd';
import CompanyDetailsForm from './forms/CompanyDetailsForm';
import DateDetailsForm from './forms/DateDetailsForm';
import AdditionalDetailsForm from './forms/AdditionalDetailsForm';
import JobDescriptionForm from './forms/JobDescriptionForm';
import { addCompany } from '../../react query/api/company';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CustomFormBuilder from './forms/CustomFormBuilder';
const { Title } = Typography;

const AddCompanyPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [companyDetails , setCompanyDetail] = useState({})
  const [jobDescription , setJobDescription] = useState({})
  const [dateDetails , setdateDetails] = useState({})
  const [additionData  ,setAdditionalData] = useState({})
  const [fields ,setFields] = useState([])
  const[customForm , setCustomForm]  =useState([])

  const steps = [
    // {title:'Fields Details' , component:<CustomFormBuilder fields={fields}  setFields={setFields} />},

    { title: 'Company Details', component: <CompanyDetailsForm  /> },
    { title: 'Job Description', component: <JobDescriptionForm /> },
    { title: 'Date Details', component: <DateDetailsForm  /> },
    { title: 'Additional Details', component: <AdditionalDetailsForm /> },
    {title:'Fields Details' , component:<CustomFormBuilder fields={fields}  setFields={setFields} />},


  ];
  const [formName  ,setFormaName] = useState(steps[0].title)
  const next =async() => {
  try {

    const values = await form.validateFields();

    if (currentStep === 0) {  
      setCompanyDetail(values); 
      console.log(companyDetails)
   
    } else if (currentStep === 1) {
      setJobDescription(values);
    } else if (currentStep === 2) {
      setdateDetails(values);
    } else if (currentStep === 3) {
      setAdditionalData(values);
    }

    setCurrentStep(currentStep + 1);
    setFormaName(steps[currentStep+1].title)

  } catch (error) {
  
    console.log("Validation failed");
  }
  };

  const  addCompanyMutation = useMutation( { mutationFn:addCompany ,

    onSuccess : (data)=>{
      console.log(data)
      // form.resetFields()
      toast.success("Successfully Added")
    },
    onError:(err)=>{
      console.log(err.message)
      toast.error(err)
    }
  })
  const prev = () => {
    setCurrentStep(currentStep - 1);
    setFormaName(steps[currentStep-1].title)
  };

  const handleAddCompany = (values) => {
  
    setAdditionalData(values)
const companyApplication = {...jobDescription , ...dateDetails , ...additionData}
console.log(companyDetails)
companyApplication.status  = true
delete companyDetails.status
    const data = {
    companyDetails , companyApplication ,customForm:fields
    }
    addCompanyMutation.mutate(data)

  };

  return (
    <div className="container mx-auto p-4">
      <Title level={2}> {formName}</Title>
      <Form form={form} onFinish={handleAddCompany} layout="vertical">
        <div className="transition transform duration-500">
          {steps[currentStep].component}
        </div>
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <Button onClick={prev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddCompanyPage;
