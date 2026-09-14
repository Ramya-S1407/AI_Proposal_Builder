const SAMPLE_TRANSCRIPT = `Sales Representative: Hello, thank you for joining the call today.

Client: My name is Arun Kumar, and I represent ABC Retail Technologies. We run an online retail business.

Sales Representative: What challenges are you currently facing?

Client: Our existing e-commerce website is outdated and slow. Customers sometimes face problems while making payments, and our team manually manages orders.

Sales Representative: What would you like the new system to include?

Client: We need a modern and responsive e-commerce website. It should include a product catalogue, customer registration and login, a shopping cart, secure payment gateway integration, and an admin dashboard to manage products and orders.

Sales Representative: Do you have a preferred timeline?

Client: We would like the project to be completed within approximately six weeks.

Sales Representative: Do you have a budget range in mind?

Client: Our approximate budget is around ₹2,00,000.

Sales Representative: Great. We will prepare a proposal based on your requirements.

Client: That sounds good. Please send the proposal as soon as possible.`;


const STYLE_LIBRARY = [
    {
        id: "ops",
        name: "Two Peaks — ops & systems",
        desc: "Plain-spoken, numbers up front, short scope blocks."
    },
    {
        id: "agency",
        name: "Kiln Studio — brand & web",
        desc: "Warmer, narrative-led and client-focused."
    },
    {
        id: "saas",
        name: "Fieldstack — SaaS onboarding",
        desc: "Crisp, structured and ROI-forward."
    }
];


let selectedStyle = STYLE_LIBRARY[0];
let extracted = null;
let secondsElapsed = 0;


/* ---------------------------------------------------------
   Boot
--------------------------------------------------------- */

function boot() {

    const shelf = document.getElementById("shelf");

    STYLE_LIBRARY.forEach(style => {

        const el = document.createElement("button");

        el.className =
            "shelf-item" +
            (style.id === selectedStyle.id ? " selected" : "");

        el.innerHTML = `
            <h4>${style.name}</h4>
            <p>${style.desc}</p>
        `;

        el.onclick = () => {

            selectedStyle = style;

            document
                .querySelectorAll(".shelf-item")
                .forEach(x => x.classList.remove("selected"));

            el.classList.add("selected");
        };

        shelf.appendChild(el);
    });


    setInterval(() => {

        secondsElapsed++;

        const minutes =
            String(Math.floor(secondsElapsed / 60)).padStart(2, "0");

        const seconds =
            String(secondsElapsed % 60).padStart(2, "0");

        const freshTime =
            document.getElementById("freshTime");

        if (freshTime) {
            freshTime.textContent =
                `${minutes}:${seconds}`;
        }

    }, 1000);
}


/* ---------------------------------------------------------
   Intake
--------------------------------------------------------- */

function switchTab(tab) {

    document
        .querySelectorAll(".intake-tab")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.tab === tab
            );

        });
}


function loadSample() {

    const input =
        document.getElementById("transcriptInput");

    input.value = SAMPLE_TRANSCRIPT;

    switchTab("paste");

    toast("Sample call loaded.");
}


function handleFile(event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {

        document.getElementById(
            "transcriptInput"
        ).value = e.target.result;

        toast("Transcript file loaded.");

    };

    reader.readAsText(file);
}


/* ---------------------------------------------------------
   Progress steps
--------------------------------------------------------- */

function setStep(number) {

    for (let i = 1; i <= 4; i++) {

        const step =
            document.getElementById("step" + i);

        if (!step) continue;

        step.classList.remove("active", "done");

        if (i < number) {
            step.classList.add("done");
        }

        if (i === number) {
            step.classList.add("active");
        }
    }


    for (let i = 1; i <= 3; i++) {

        const line =
            document.getElementById("line" + i);

        if (!line) continue;

        line.classList.toggle(
            "done",
            i < number
        );
    }
}


/* ---------------------------------------------------------
   Toast
--------------------------------------------------------- */

function toast(message) {

    const element =
        document.getElementById("toast");

    if (!element) return;

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 2600);
}


/* ---------------------------------------------------------
   MAIN GENERATION
--------------------------------------------------------- */

async function generateProposal() {

    const transcript =
        document
            .getElementById("transcriptInput")
            .value
            .trim();


    if (!transcript) {

        toast(
            "Paste a transcript or load the sample call first."
        );

        return;
    }


    const button =
        document.getElementById("generateBtn");


    button.disabled = true;

    button.textContent =
        "Analyzing the call…";


    setStep(2);


    const waveform =
        document.getElementById("waveform");

    if (waveform) {
        waveform.classList.add("live");
    }


    try {

        await sleep(500);

        setStep(3);

        button.textContent =
            "Drafting the proposal…";


        /*
         * Send transcript to Flask.
         *
         * Flask then:
         *
         * Transcript
         *      ↓
         * Gemini analysis
         *      ↓
         * TF-IDF retrieval
         *      ↓
         * Gemini proposal generation
         */

        const response = await fetch(
            "/generate",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body: new URLSearchParams({
                    transcript: transcript
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Proposal generation failed."
            );
        }


        extracted = data;


        renderAnalysis(data.analysis);

        renderProposal(
            data.proposal,
            data.proposal_file,
            data.similarity_score
        );


        const emptyStage =
            document.getElementById("emptyStage");

        if (emptyStage) {
            emptyStage.style.display = "none";
        }


        const paperWrap =
            document.getElementById("paperWrap");

        if (paperWrap) {
            paperWrap.classList.add("show");
        }


        setStep(4);


        button.disabled = false;

        button.textContent =
            "Redraft";


        if (waveform) {
            waveform.classList.remove("live");
        }


        const status =
            document.getElementById("statusNote");

        if (status) {

            status.classList.add("show");

            status.textContent =
                `Draft generated using ${data.proposal_file}. Similarity score: ${data.similarity_score}`;
        }


        toast(
            "Proposal generated successfully."
        );


    } catch (error) {

        console.error(error);


        button.disabled = false;

        button.textContent =
            "Draft the proposal";


        if (waveform) {
            waveform.classList.remove("live");
        }


        toast(
            "Error: " + error.message
        );
    }
}


/* ---------------------------------------------------------
   Display Gemini analysis
--------------------------------------------------------- */

function renderAnalysis(analysis) {

    const signals =
        document.getElementById("signals");

    if (!signals) return;


    signals.innerHTML = "";

    signals.classList.add("show");


    const lines =
        analysis
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);


    const usefulLines =
        lines.slice(0, 6);


    usefulLines.forEach(line => {

        const chip =
            document.createElement("span");

        chip.className = "chip";

        chip.textContent = line;

        signals.appendChild(chip);

    });
}


/* ---------------------------------------------------------
   Display generated proposal
--------------------------------------------------------- */

function renderProposal(
    proposal,
    proposalFile,
    similarityScore
) {

    const paper =
        document.getElementById("paper");

    if (!paper) return;


    const today =
        new Date().toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    const formattedProposal =
        escapeHtml(proposal)
            .replace(/\n\n/g, "</p><p>")
            .replace(/\n/g, "<br>");


    paper.innerHTML = `

        <div class="kicker">
            Proposal · ${today}
        </div>

        <h1>
            Personalized Project Proposal
        </h1>

        <div class="for-line">
            Generated from sales call
        </div>

        <p>
            ${formattedProposal}
        </p>

        <div class="proposal-meta">

            <strong>
                Based on previous proposal:
            </strong>

            ${escapeHtml(proposalFile)}

            <br>

            <strong>
                Similarity score:
            </strong>

            ${similarityScore}

        </div>

    `;
}


/* ---------------------------------------------------------
   Copy proposal
--------------------------------------------------------- */

function copyProposal() {

    const paper =
        document.getElementById("paper");

    if (!paper) return;


    const text =
        paper.innerText;


    navigator.clipboard
        .writeText(text)
        .then(() => {

            toast(
                "Proposal copied as plain text."
            );

        })
        .catch(() => {

            toast(
                "Could not copy the proposal."
            );

        });
}
async function downloadDocx() {

    if (!extracted || !extracted.proposal) {
        toast("Generate a proposal first.");
        return;
    }

    try {

        const response = await fetch(
            "/download-docx",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    proposal: extracted.proposal
                })
            }
        );

        if (!response.ok) {

            const data = await response.json();

            throw new Error(
                data.error || "DOCX download failed."
            );
        }

        const blob = await response.blob();

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "personalized_proposal.docx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast("DOCX downloaded successfully.");

    } catch (error) {

        console.error(error);

        toast("Error: " + error.message);
    }
}


async function downloadPdf() {

    if (!extracted || !extracted.proposal) {
        toast("Generate a proposal first.");
        return;
    }

    try {

        const response = await fetch(
            "/download-pdf",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    proposal: extracted.proposal
                })
            }
        );

        if (!response.ok) {

            const data = await response.json();

            throw new Error(
                data.error || "PDF download failed."
            );
        }

        const blob = await response.blob();

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "personalized_proposal.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast("PDF downloaded successfully.");

    } catch (error) {

        console.error(error);

        toast("Error: " + error.message);
    }
}

/* ---------------------------------------------------------
   Email proposal
--------------------------------------------------------- */

function emailProposal() {

    if (!extracted) {

        toast(
            "Generate a proposal first."
        );

        return;
    }


    const body =
        encodeURIComponent(
            document.getElementById("paper").innerText
        );


    const subject =
        encodeURIComponent(
            "Project Proposal"
        );


    window.location.href =
        `mailto:?subject=${subject}&body=${body}`;
}


/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function sleep(milliseconds) {

    return new Promise(
        resolve => setTimeout(
            resolve,
            milliseconds
        )
    );
}


/* Start application */

boot();