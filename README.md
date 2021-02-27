# Adobe Topcoder Project
> Technologies Used
  - Angular 11
  - Node.js(Express)
  - Adobe PDF API
> Key Learnings
  - A service file can be a simple dummy db
  - If a **get** function is created in a class, a simple *this.object* can return the properties of the object in any format when the object is returned from a service file
  - **combineLatest** function of rxjs

> Problem Statement


  
> The users of the platform are in two different roles:

**Company:** A company is an organization user of the platform.
**Candidate:** The applicant that already has passed the interview, a candidate of the employee. One candidate can only be associated with one company.
# 1. LOGIN SCREEN
The company and the candidate users can log in to the application, you can create a login screen to ask the user to enter the username and password, and select the role Company or Candidate.

There should be a link to the Registration screen on the Login screen.

Initially, there are no company and candidate users, they should be created via the Registration Screen.

After the users log in, it takes them to the Dashboard screen. The Dashboard screens of different roles are different.

# 2. REGISTRATION SCREEN
On the registration screen, there should be an option to select the role Company or Candidate to be registered.

To register a company user, the following info should be provided

The name of the company
Username
Password
To register a candidate user, the following info should be provided

Name
Username
Password
The associated company
For password, there should be a double-confirm password text field.

After the registration is completed, the user logs in automatically, then it takes the user to the Dashboard screen.

# 3. DASHBOARD SCREEN OF THE COMPANY USER
The company user is able to initiate a draft of a Labor Contract, to initiate a draft of the Labor Contract, the user needs to enter the following information.

Pick one or more candidates that are associated with the company.
Give a name to the Labor Contract.
Then click on a button to initiate the Labor Contract.
Once the labor contract is initiated, a blank PDF document is created. The company user can add/modify/delete content in the PDF document.

If the company users picked multiple candidates while creating the Labor Contract, multiple copies of the Labor Contract will be created, each candidate will have an exclusive Labor Contract copy to sign.

A Labor Contract copy can be in the following status

Draft: It’s not finalized by the company user yet.
Finalized: The company user can finalize it after they finish the editing.
Approved by the candidate: It is approved by the candidate.
Approved by the company: It is approved by the company user.
Approved: Approved by both sides.
Signed: Signed by both sides
The draft Labor Contract is visible to both the company user and their candidate users, as long as they are logged in. They should be able to view the edit process seamlessly, It means for each PDF file, once the content is edited, all the users who are viewing the file can see them in less than 3 seconds.

Both the company user and candidate users can debate over a term/condition in the agreement by means of comments/annotations. And the respondent users can either accept or reject a respective term/condition. You can regard any portion of the content as a term/condition.

If a company user wants to ask any queries to their respective candidate then they can tag their candidates and ask queries by means of comment. These comments should only be visible to the tagged candidate users.

Once the company user feels the editing is good, he/she can finalize it, then the Labor Contract turns to the Finalized status.

Once the candidate user agrees on terms/conditions and then he/she can approve the Labor Contract then the Labor Contract turns to the Approved by the candidate status.

Once the company user agrees on terms/conditions and then he/she can approve the Labor Contract then the Labor Contract turns to the Approve by the company status.

If both sides approve it, the Labor Contract turns to the Approve status.

Once the Labor Contract is approved, both the company user and the candidate user can sign, after both sides signed the Labor Contract, it turns to the Signed status, and then both sides are bound by the law as per this Labor Contract.

If the user hasn't signed the Labor Contact, he/she can cancel the approval at any time.

A company user can initiate an arbitrary number of the draft Labor Contracts, as long as the Labor Contract is in the draft status, they can be edited or removed.

On the dashboard screen, there should be a table to denote the details of each Labor Contract copy. The table columns should include

Name of the Labor Contract: the cell should link to the embedded viewer of the PDF.
Name of the company
Name of the associated candidate
Status of the PDF: It should be one of Draft, Finalized, Approved by the candidate, Approved by the company, Approved and Signed.
An approve button: Only the finalized Labor Contract can be approved.
A delete button: Only the draft Labor Contract can be deleted.
# 4. DASHBOARD SCREEN OF THE CANDIDATE
The candidate users can only view the content of the Labor Contract, once the Labor Contract is in Finalized status, they can approve it; once the Labor Contract is in Approved status, they can sign it.

On the dashboard screen, there should be a table to denote the details of each agreement. The table columns should include

Name of the Labor Contract: the cell should link to the embedded viewer of the PDF.
Name of the company
Name of the associated candidate
Status of the PDF: It should be one of Draft, Finalized, Approved by the candidate, Approved by the company, Approved and Signed.
An approve button: Only the finalized Labor Contract can be approved.
