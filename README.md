# AI Proposal Builder

> An AI-powered application that transforms sales call transcripts into personalized business proposals.

AI Proposal Builder analyzes sales call transcripts, identifies customer requirements and pain points, references relevant past proposals, and generates a personalized proposal.

## 1. Problem Statement

For many small and medium-sized businesses, the sales process does not end when a sales call ends.

After a successful sales conversation, the team still needs to:

* Review the conversation
* Identify customer requirements
* Understand pain points and business objectives
* Search for relevant previous proposals
* Create a customized proposal
* Send the proposal to the prospect

This manual process can take several hours and creates a delay between the sales conversation and proposal delivery.

## 2. Solution

AI Proposal Builder automates the transition from sales conversation to proposal creation.

The application analyzes the transcript, extracts important business information, uses relevant previous proposals as references, and generates a personalized proposal.

## 3. Workflow

```text
Sales Call
    |
    v
Call Transcript
    |
    v
Transcript Analysis
    |
    v
Requirements + Pain Points + Business Context
    |
    v
Relevant Past Proposal Matching
    |
    v
Proposal Generation
    |
    v
Personalized Proposal
```

## 4. Key Features

### Transcript Analysis

* Analyzes sales call transcripts
* Extracts important information from conversations
* Identifies relevant business context

### Requirement Extraction

* Identifies customer requirements
* Captures customer pain points
* Understands business goals and expectations

### Past Proposal Matching

* Uses previous proposals as references
* Helps maintain consistency across proposals
* Provides relevant context for proposal generation

### AI Proposal Generation

* Generates personalized proposals based on the sales conversation
* Uses extracted requirements and relevant proposal information
* Reduces repetitive manual work

### Faster Sales Follow-up

* Reduces the time required to prepare proposals
* Helps sales teams respond to prospects faster
* Supports a more efficient post-call workflow

## 5. Technology Stack

| Technology                | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| Python                    | Application development                                |
| Google Gemini API         | AI-powered transcript analysis and proposal generation |
| LLM-based text analysis   | Requirement and context extraction                     |
| File-based knowledge base | Storage and retrieval of previous proposals            |

## 6. Project Structure

```text
AI_Proposal_Builder/
|
├── app.py
├── README.md
├── requirements.txt
├── .gitignore
├── .env.example
|
├── modules/
│   ├── document_generator.py
│   ├── transcript_analyzer.py
│   ├── proposal_generator.py
│   └── proposal_retriever.py
|
├── data/
│   ├── transcripts/
│   └── past_proposals/
|
├── outputs/
|
└── tests/
    └── test_transcript_analyzer.py
```

## 7. Installation

### Prerequisites

Make sure the following are installed:

* Python 3.x
* Git
* A Google Gemini API key

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI_Proposal_Builder.git
```

Navigate to the project directory:

```bash
cd AI_Proposal_Builder
```

### Step 2: Create a Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure the Gemini API

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

The `.env.example` file can be used as a template.

For security reasons, never commit the `.env` file or expose your API key publicly.

### Step 5: Run the Application

```bash
python app.py
```

## 8. Environment Variables

The application requires the following environment variable:

| Variable         | Description           |
| ---------------- | --------------------- |
| `GEMINI_API_KEY` | Google Gemini API key |

Example:

```env
GEMINI_API_KEY=your_api_key_here
```

## 9. Example Input

A sales call transcript may contain:

```text
Client:

We currently create proposals manually after every sales call.
It usually takes our team several hours.

We want to reduce the time required to prepare proposals
and make sure every proposal is personalized to the customer.
```

The application analyzes the conversation and extracts structured information such as:

```text
Customer Problem:
Manual proposal creation is time-consuming.

Requirement:
Automate proposal generation.

Goal:
Reduce proposal turnaround time.

Priority:
Fast and personalized sales follow-up.
```

## 10. Example Output

Based on the extracted information and relevant previous proposals, the application can generate a proposal containing sections such as:

```text
Executive Summary

Understanding of Your Requirements

Proposed Solution

Key Benefits

Implementation Approach

Timeline

Investment

Next Steps
```

## 11. Use Cases

AI Proposal Builder can be used by:

* Sales teams
* Founders
* Small and medium-sized businesses
* Consulting companies
* Digital agencies
* B2B service providers

The primary objective is to reduce the time between a successful sales conversation and delivery of a personalized proposal.

```text
Sales Call Completed
        |
        v
Proposal Preparation
        |
        v
Personalized Proposal Delivered
```

## 12. Future Improvements

The following features are planned for future versions:

* [ ] Zoom transcript integration
* [ ] Google Meet transcript integration
* [ ] Microsoft Teams transcript integration
* [ ] PDF proposal generation
* [ ] Custom proposal templates
* [ ] Vector database for semantic proposal search
* [ ] CRM integration
* [ ] Automated proposal email delivery
* [ ] Web-based user interface
* [ ] Proposal quality scoring
* [ ] Customer-specific proposal history

## 13. Project Status

**Status: Under Development**

The current objective is to build an end-to-end AI workflow that transforms sales call transcripts into personalized business proposals.

## 14. Author

**Ramya S**

This project was developed as an AI automation project to explore practical applications of Generative AI in business workflows.

## 15. License

This project is currently intended for learning and portfolio purposes.
