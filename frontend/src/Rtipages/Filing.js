import React from 'react';
import './Filing.css';

const Filing = () => {
  return (
    <div className="container1">
      <h1>What is the RTI Act?</h1>
      <p>
        The Right to Information (RTI) Act is a landmark legislation enacted in India that empowers citizens to seek information from any public or government authority. Under the RTI Act, any citizen can request information, provided it does not pertain to national security, defense, or personal information. The public authority is obligated to respond to the application within 30 days.
      </p>
      <p>
        While information disclosure in India is restricted by the Official Secrets Act of 1923 and various other special laws, many of these restrictions have been relaxed in light of the RTI Act. The Act also mandates that all public authorities computerize their records to facilitate faster processing of information requests through better categorization.
      </p>

      <h2>What Information Can One Seek Under the RTI Act?</h2>
      <p>
        The RTI Act allows any Indian citizen to seek answers from any government authority. This can include inquiries about delayed IT refunds, passport or driving license statuses, details of ongoing or completed infrastructure projects, the status of an FIR, and funds allocated to various government schemes, including those related to MPs, MLAs, and the PM relief fund. Students can also request copies of their answer sheets from universities. The power of RTI and its applications are vast, emphasizing the importance of asking the right questions.
      </p>

      <h2>How to File an RTI Application</h2>
      <ol>
        <li>Visit the Online RTI Portal and click on the "Submit Request" option.</li>
        <li>Read the guidelines and check the box indicating that you have understood them, then click the submit button.</li>
        <li>Select the relevant Ministry or Department from the dropdown menu.</li>
        <li>If you provide a mobile number, you will receive SMS alerts. Fields marked with an asterisk (*) are mandatory.</li>
        <li>If you belong to the Below Poverty Line (BPL) category, select "Yes" and upload your BPL card certificate. No RTI fee is required for BPL applicants.</li>
        <li>Upon submission, a unique registration number will be issued for future reference.</li>
        <li>If you are not in the BPL category, select "No" and pay the prescribed fee of Rs 10.</li>
        <li>The text for your RTI request should be up to 3000 characters. If it exceeds this limit, you can upload the application in the supporting document field.</li>
        <li>After filling in all details, click on the "Make Payment" option.</li>
        <li>Select your payment mode and complete the payment process.</li>
        <li>You will receive an email and SMS alert confirming the submission of your application.</li>
      </ol>

      <h2>What to Do If Your RTI Request Is Rejected?</h2>
      <p>
        There is a fundamental difference between an RTI Request and an RTI Appeal. An RTI Request is the initial application made by a citizen to a Public Information Officer (PIO) for information. In contrast, an RTI Appeal is filed with a senior officer against the PIO's decision, involving a third party (the Appellate Authority).
      </p>
      <p>
        An appeal is necessary if the citizen is dissatisfied with the PIO's response or if the request is rejected.
      </p>

      <h2>Steps for Filing an RTI Application First Appeal</h2>
      <ol>
        <li>Click on the "Submit First Appeal" option on the RTI online portal.</li>
        <li>Read the guidelines and check the box indicating that you have read and understood them, then click the submit button.</li>
        <li>Enter the registration number, email ID, and security code.</li>
        <li>Select a reason for filing the appeal from the "Ground for Appeal" dropdown.</li>
        <li>The text for the RTI first appeal should be up to 3000 characters. If it exceeds this limit, you can upload the application in the supporting document field.</li>
        <li>Upon submission, a unique registration number will be issued for future reference.</li>
      </ol>

    </div>
  );
};

export default Filing;