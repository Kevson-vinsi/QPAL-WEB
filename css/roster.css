/* ==========================================================
   QPAL — Roster Styles & Enhanced Swipable Popups
========================================================== */

/* ---------- Floating Admin Button (Sides Only) ---------- */
.floating-logo-btn {
    position: fixed;
    top: 50%;
    left: 18px;
    transform: translateY(-50%);
    z-index: 150;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--navy-deep);
    border: 2px solid var(--gold);
    color: var(--gold-bright);
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: bold;
    cursor: grab;
    box-shadow: 0 0 15px rgba(201, 162, 74, 0.3);
    transition: box-shadow 0.3s ease, background 0.3s ease, top 0.2s ease, left 0.2s ease, right 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    touch-action: none;
}

.floating-logo-btn:active {
    cursor: grabbing;
}

.floating-logo-btn.admin-active {
    background: var(--gold);
    color: var(--ink);
    border-color: var(--gold-bright);
    box-shadow: 0 0 20px rgba(230, 200, 120, 0.8);
}

/* ---------- Admin Mode Elements ---------- */
.admin-only {
    display: none !important;
}

body.admin-mode .admin-only {
    display: flex !important;
}

body.admin-mode .card-admin-actions {
    display: flex !important;
}

.card-admin-actions {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    gap: 6px;
    z-index: 10;
}

.card-edit-btn,
.card-delete-btn {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, transform 0.2s ease;
}

.card-edit-btn {
    background: rgba(201, 162, 74, 0.9);
    color: var(--ink);
}

.card-edit-btn:hover {
    background: var(--gold-bright);
    transform: scale(1.15);
}

.card-delete-btn {
    background: rgba(232, 92, 92, 0.85);
    color: #ffffff;
    font-size: 16px;
}

.card-delete-btn:hover {
    background: #ff3b3b;
    transform: scale(1.15);
}

.add-card-btn {
    margin: 32px auto 0;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--navy-deep);
    border: 2px dashed var(--gold);
    color: var(--gold-bright);
    font-size: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}

.add-card-btn:hover {
    background: var(--gold);
    color: var(--ink);
    border-style: solid;
    transform: scale(1.1);
}

/* ---------- Form Controls & Image Upload Zone ---------- */
#addMemberModal textarea,
#addMemberModal input:not([type="file"]),
#adminAuthForm input {
    width: 100%;
    background: var(--navy);
    border: 1px solid rgba(201, 162, 74, 0.3);
    color: var(--parchment);
    padding: 10px 12px;
    font-family: var(--font-body);
    font-size: 13.5px;
    border-radius: 6px;
    margin-bottom: 12px;
}

#addMemberModal label {
    display: block;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--gold);
    margin-bottom: 4px;
    text-align: left;
    text-transform: uppercase;
}

#addMemberModal textarea:focus,
#addMemberModal input:not([type="file"]):focus,
#adminAuthForm input:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 8px rgba(201, 162, 74, 0.25);
}

/* Styled Image Dropzone Button */
.avatar-upload-dropzone {
    position: relative;
    width: 100%;
    height: 80px;
    border: 2px dashed rgba(201, 162, 74, 0.4);
    border-radius: 10px;
    background: rgba(8, 12, 20, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 14px;
    overflow: hidden;
    transition: border-color 0.25s ease, background 0.25s ease;
}

.avatar-upload-dropzone:hover {
    border-color: var(--gold);
    background: rgba(201, 162, 74, 0.08);
}

.avatar-upload-dropzone input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
}

.upload-icon {
    font-size: 20px;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 4px;
}

.upload-text {
    font-size: 12px;
    font-family: var(--font-display);
    color: var(--parchment);
    letter-spacing: 0.05em;
}

.upload-preview-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
}

.avatar-upload-dropzone.has-image .upload-preview-img {
    display: block;
}

.avatar-upload-dropzone.has-image .upload-icon,
.avatar-upload-dropzone.has-image .upload-text {
    display: none;
}

/* ---------- Roster Navigation Tabs ---------- */
.roster-tabs {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-bottom: 40px;
}

.roster-tab {
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--parchment-dim);
    background: transparent;
    border: 1px solid rgba(201, 162, 74, 0.35);
    padding: 12px 34px;
    cursor: pointer;
    transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.roster-tab:hover {
    color: var(--gold-bright);
    border-color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(201, 162, 74, 0.2);
}

.roster-tab.active {
    color: var(--ink);
    background: var(--gold);
    border-color: var(--gold);
    box-shadow: 0 8px 20px rgba(201, 162, 74, 0.3);
}

.roster-panel {
    display: none;
}

.roster-panel.active {
    display: block;
}

/* ---------- Grid Layout ---------- */
.officer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    margin-top: 20px;
}

/* ---------- Card Styles & Hover Effects ---------- */
.person-card {
    position: relative;
    background: var(--navy-deep);
    border: 1px solid rgba(201, 162, 74, 0.25);
    padding: 26px 22px 28px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    will-change: transform, box-shadow, border-color;
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease;
}

.person-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 80%;
    height: 100%;
    background: linear-gradient(110deg, transparent 0%, rgba(230, 200, 120, 0.05) 20%, rgba(255, 225, 140, 0.65) 50%, rgba(230, 200, 120, 0.05) 80%, transparent 100%);
    transform: skewX(-25deg);
    transition: left 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    pointer-events: none;
    z-index: 5;
}

.person-card:hover::before {
    left: 170%;
}

.person-card:hover {
    transform: translateY(-8px);
    border-color: var(--gold);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(201, 162, 74, 0.28);
}

.card-visual {
    position: relative;
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    z-index: 1;
}

/* BIG POSITION TEXT BEFORE HOVER (OFFICERS) */
.position-title {
    position: absolute;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold-bright);
    text-shadow: 0 0 12px rgba(201, 162, 74, 0.4);
    transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.person-card:hover .position-title {
    opacity: 0;
    transform: scale(0.7) translateY(-10px);
}

/* Fallback Icon for cards without position titles */
.rank-icon {
    position: absolute;
    font-size: 30px;
    line-height: 1;
    color: var(--gold);
    transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.person-card:hover .rank-icon {
    opacity: 0;
    transform: scale(0.65) rotate(12deg);
}

/* PERFECT CIRCLE STYLING ON HOVER */
.avatar {
    position: absolute;
    width: 78px !important;
    height: 78px !important;
    min-width: 78px !important;
    min-height: 78px !important;
    max-width: 78px !important;
    max-height: 78px !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 50% !important;
    border: 2px solid var(--gold-bright);
    opacity: 0;
    transform: scale(0.65) rotate(-10deg);
    transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
    overflow: hidden;
    flex-shrink: 0;
    box-sizing: border-box;
}

.person-card:hover .avatar {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 22px rgba(230, 200, 120, 0.5);
}

img.avatar {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block;
}

div.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--ink);
    background: radial-gradient(circle at 35% 30%, hsl(var(--hue), 70%, 68%), hsl(var(--hue), 55%, 38%));
}

.person-rank {
    position: relative;
    z-index: 1;
    display: block;
    font-size: 12px;
    letter-spacing: 0.18em;
    color: var(--gold);
    margin-bottom: 10px;
}

.person-name {
    position: relative;
    z-index: 1;
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--parchment);
    letter-spacing: 0.02em;
}

/* ---------- Fixed Name & Nickname Layout (No Overlap) ---------- */
.person-name-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    gap: 2px;
}

.person-name-wrap .person-name,
.person-name-wrap .person-nickname {
    position: relative;
    transition: opacity 0.35s ease, transform 0.35s ease, font-size 0.35s ease;
}

.person-name-wrap .person-nickname {
    font-family: var(--font-display);
    font-size: 16px;
    color: var(--gold-bright);
}

/* ---------- Officer Card Specific Hover States ---------- */
#officersPanel .person-card .person-name {
    opacity: 1;
    transform: translateY(0);
}

#officersPanel .person-card .person-nickname {
    opacity: 0.7;
    font-size: 13px;
}

#officersPanel .person-card:hover .person-name {
    transform: translateY(-2px);
    color: var(--gold-bright);
    text-shadow: 0 0 16px rgba(230, 200, 120, 0.45);
}

#officersPanel .person-card:hover .person-nickname {
    opacity: 1;
    transform: translateY(-2px);
    font-size: 15px;
}

/* ---------- Members Card Hover States ---------- */
#membersPanel .person-card .person-name {
    opacity: 1;
}

#membersPanel .person-card .person-nickname {
    opacity: 0.7;
    font-size: 13px;
}

#membersPanel .person-card:hover .person-name {
    opacity: 0.7;
    font-size: 15px;
}

#membersPanel .person-card:hover .person-nickname {
    opacity: 1;
    font-size: 17px;
}

.member-search {
    display: block;
    width: 100%;
    max-width: 320px;
    margin: 0 auto 28px;
    background: var(--navy-deep);
    border: 1px solid rgba(201, 162, 74, 0.3);
    color: var(--parchment);
    font-family: var(--font-body);
    font-size: 14px;
    padding: 11px 16px;
}

/* ---------- Stylized Swipable Modal Overlays ---------- */
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    background: rgba(4, 6, 12, 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 600px) {
    .modal-overlay {
        align-items: center;
        padding: 20px;
    }
}

.modal-overlay.open {
    opacity: 1;
    pointer-events: auto;
}

/* Card Drawer Body */
.modal-box {
    position: relative;
    width: 100%;
    max-width: 420px;
    max-height: 88vh;
    overflow-y: auto;
    background: linear-gradient(180deg, rgba(16, 24, 38, 0.98) 0%, var(--navy-deep) 100%);
    border-top: 2px solid var(--gold);
    border-left: 1px solid rgba(201, 162, 74, 0.3);
    border-right: 1px solid rgba(201, 162, 74, 0.3);
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(201, 162, 74, 0.15);
    padding: 20px 24px 30px;
    text-align: center;
    opacity: 0;
    transform: translateY(100%);
    transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.15), opacity 0.3s ease;
    touch-action: pan-y;
}

@media (min-width: 600px) {
    .modal-box {
        border-radius: 20px;
        border-bottom: 1px solid rgba(201, 162, 74, 0.3);
        transform: translateY(30px) scale(0.95);
    }
}

.modal-overlay.open .modal-box {
    opacity: 1;
    transform: translateY(0) scale(1);
}

/* Visual Swipe Pull Bar */
.modal-box::before {
    content: '';
    display: block;
    width: 42px;
    height: 5px;
    background: linear-gradient(90deg, rgba(201, 162, 74, 0.4), var(--gold-bright), rgba(201, 162, 74, 0.4));
    border-radius: 3px;
    margin: 0 auto 20px;
    box-shadow: 0 0 8px rgba(230, 200, 120, 0.5);
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 18px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(201, 162, 74, 0.2);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    color: var(--parchment-dim);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.modal-close:hover {
    color: var(--gold-bright);
    background: rgba(201, 162, 74, 0.15);
    border-color: var(--gold);
}

/* Custom Styled Avatar in Modal */
.modal-avatar {
    width: 90px !important;
    height: 90px !important;
    min-width: 90px !important;
    min-height: 90px !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 50% !important;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 30px;
    color: var(--ink);
    background: radial-gradient(circle at 35% 30%, hsl(var(--hue, 38), 70%, 68%), hsl(var(--hue, 38), 55%, 38%));
    border: 3px solid var(--gold-bright);
    box-shadow: 0 0 25px rgba(201, 162, 74, 0.35);
    overflow: hidden;
    flex-shrink: 0;
    box-sizing: border-box;
}

.modal-avatar img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
}

.modal-rank {
    display: inline-block;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    color: var(--gold);
    text-transform: uppercase;
    background: rgba(201, 162, 74, 0.12);
    padding: 3px 12px;
    border-radius: 12px;
    border: 1px solid rgba(201, 162, 74, 0.3);
    margin-bottom: 8px;
}

.modal-name {
    font-family: var(--font-display);
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0.02em;
    margin-bottom: 18px;
}

/* Styled Stat Cards */
.modal-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 18px;
}

.modal-details-card {
    background: rgba(8, 12, 20, 0.6);
    border: 1px solid rgba(201, 162, 74, 0.18);
    border-radius: 10px;
    padding: 10px 12px;
}

.modal-details-card span {
    display: block;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 4px;
}

.modal-details-card p {
    font-size: 13px;
    color: var(--parchment);
    font-weight: 500;
}

.modal-bio {
    font-size: 13.5px;
    color: var(--parchment-dim);
    line-height: 1.5;
    background: rgba(8, 12, 20, 0.4);
    border-radius: 10px;
    padding: 14px;
    border: 1px dashed rgba(201, 162, 74, 0.2);
    text-align: left;
}