document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Firestore Integration Engine
    ========================================================== */
    let currentRoster = [];

    function initFirestore() {
        if (!window.firestoreService) {
            setTimeout(initFirestore, 100);
            return;
        }

        const { db, collection, onSnapshot } = window.firestoreService;
        const rosterRef = collection(db, "roster");

        onSnapshot(rosterRef, (snapshot) => {
            currentRoster = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            renderRosterCards();
        }, (error) => {
            console.error("Error fetching Firestore roster updates:", error);
        });
    }

    function renderRosterCards() {
        const officersGrid = document.getElementById('officersGrid');
        const membersGrid = document.getElementById('membersGrid');

        if (officersGrid) officersGrid.innerHTML = '';
        if (membersGrid) membersGrid.innerHTML = '';

        currentRoster.forEach(member => {
            const isOfficer = member.section === 'officers';
            const grid = isOfficer ? officersGrid : membersGrid;
            if (!grid) return;

            const newCard = document.createElement('div');
            newCard.className = 'person-card';
            if (isOfficer && (member.rank || '').toLowerCase() === 'leader') {
                newCard.classList.add('person-card--leader');
            }
            newCard.style.setProperty('--hue', (member.hue || 38).toString());
            newCard.dataset.id = member.id;
            newCard.dataset.name = member.name || '';
            newCard.dataset.nickname = member.nickname || member.name || '';
            newCard.dataset.rank = member.rank || '';
            newCard.dataset.specialty = member.specialty || '';
            newCard.dataset.joined = member.joined || '';
            newCard.dataset.bio = member.bio || '';
            if (member.avatarUrl) newCard.dataset.avatarUrl = member.avatarUrl;

            const firstLetter = (member.name || 'Q').charAt(0).toUpperCase();
            const avatarHTML = member.avatarUrl 
                ? `<img class="avatar" src="${member.avatarUrl}" alt="${member.name}">` 
                : `<div class="avatar">${firstLetter}</div>`;

            const preHoverVisual = isOfficer 
                ? `<span class="position-title">${member.rank || 'Officer'}</span>` 
                : `<span class="rank-icon">🛡</span>`;

            const nameWrapHTML = `
                <div class="person-name-wrap">
                    <h3 class="person-name">${member.name || ''}</h3>
                    <h3 class="person-nickname">${member.nickname || member.name || ''}</h3>
                </div>
            `;

            newCard.innerHTML = `
                <div class="card-admin-actions">
                    <button class="card-edit-btn" type="button" aria-label="Edit member">&#9998;</button>
                    <button class="card-delete-btn" type="button" aria-label="Delete member">&times;</button>
                </div>
                <div class="card-visual">
                    ${preHoverVisual}
                    ${avatarHTML}
                </div>
                <span class="person-rank">${(member.rank || '').toUpperCase()}</span>
                ${nameWrapHTML}
            `;

            grid.appendChild(newCard);
            attachCardClickListener(newCard);
            attachAdminCardListeners(newCard);
        });

        const memberSearch = document.getElementById('memberSearch');
        if (memberSearch && memberSearch.value.trim()) {
            memberSearch.dispatchEvent(new Event('input'));
        }
    }

    initFirestore();

    /* ==========================================================
       2. Tab Switching Controls
    ========================================================== */
    const tabs = document.querySelectorAll('.roster-tab');
    const panels = document.querySelectorAll('.roster-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            panels.forEach(panel => {
                panel.classList.toggle('active', panel.id === `${targetTab}Panel`);
            });
        });
    });

    /* ==========================================================
       3. Member Search Filter
    ========================================================== */
    const memberSearch = document.getElementById('memberSearch');
    if (memberSearch) {
        memberSearch.addEventListener('input', () => {
            const query = memberSearch.value.trim().toLowerCase();
            const memberCards = document.querySelectorAll('#membersPanel .person-card');

            memberCards.forEach(card => {
                const name = (card.dataset.name || '').toLowerCase();
                const nickname = (card.dataset.nickname || '').toLowerCase();
                const matches = !query || name.includes(query) || nickname.includes(query);
                card.style.display = matches ? '' : 'none';
            });
        });
    }

    /* ==========================================================
       4. Modal Details Engine
    ========================================================== */
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalRank = document.getElementById('modalRank');
    const modalName = document.getElementById('modalName');
    const modalSpecialty = document.getElementById('modalSpecialty');
    const modalJoined = document.getElementById('modalJoined');
    const modalBio = document.getElementById('modalBio');

    function attachCardClickListener(card) {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-admin-actions')) return;

            const name = card.dataset.name || '';
            const rank = card.dataset.rank || '';
            const specialty = card.dataset.specialty || '';
            const joined = card.dataset.joined || '';
            const bio = card.dataset.bio || '';
            const avatarUrl = card.dataset.avatarUrl || '';
            const hue = card.style.getPropertyValue('--hue') || '38';

            if (modalAvatar) {
                modalAvatar.innerHTML = '';
                modalAvatar.style.setProperty('--hue', hue);

                if (avatarUrl) {
                    const imgElement = document.createElement('img');
                    imgElement.src = avatarUrl;
                    imgElement.alt = name;
                    modalAvatar.appendChild(imgElement);
                } else {
                    const textBadge = card.querySelector('div.avatar');
                    const badgeElement = document.createElement('div');
                    badgeElement.className = 'avatar';
                    badgeElement.style.opacity = '1';
                    badgeElement.style.transform = 'none';
                    badgeElement.textContent = textBadge ? textBadge.textContent : name.charAt(0).toUpperCase();
                    modalAvatar.appendChild(badgeElement);
                }
            }

            if (modalRank) modalRank.textContent = rank;
            if (modalName) modalName.textContent = name;
            if (modalSpecialty) modalSpecialty.textContent = specialty;
            if (modalJoined) modalJoined.textContent = joined;
            if (modalBio) modalBio.textContent = bio;

            if (modalOverlay) {
                modalOverlay.classList.add('open');
                modalOverlay.setAttribute('aria-hidden', 'false');
            }
        });
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            const box = modal.querySelector('.modal-box');
            if (box) box.style.transform = '';
        }
    }

    if (modalClose) modalClose.addEventListener('click', () => closeModal(modalOverlay));

    /* ==========================================================
       5. Visual Drag & Swipe Gesture Handler
    ========================================================== */
    const allModals = document.querySelectorAll('.modal-overlay');

    allModals.forEach(modal => {
        const box = modal.querySelector('.modal-box');
        if (!box) return;

        let startY = 0;
        let currentY = 0;
        let isSwiping = false;

        box.addEventListener('touchstart', (e) => {
            if (box.scrollTop > 0) return;
            startY = e.touches[0].clientY;
            isSwiping = true;
            box.style.transition = 'none';
        }, { passive: true });

        box.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;

            if (deltaY > 0) {
                box.style.transform = `translateY(${deltaY}px)`;
            }
        }, { passive: true });

        box.addEventListener('touchend', () => {
            if (!isSwiping) return;
            isSwiping = false;
            const deltaY = currentY - startY;
            box.style.transition = '';

            if (deltaY > 110) {
                closeModal(modal);
            } else {
                box.style.transform = '';
            }
            startY = 0;
            currentY = 0;
        }, { passive: true });
    });

    /* ==========================================================
       6. Admin Engine & Image Dropzone
    ========================================================== */
    let isAdmin = false;
    let cardToDelete = null;
    let cardToEdit = null;
    let currentUploadedBase64 = '';

    const adminTriggerBtn = document.getElementById('adminTriggerBtn');
    const adminAuthModal = document.getElementById('adminAuthModal');
    const adminAuthClose = document.getElementById('adminAuthClose');
    const adminAuthForm = document.getElementById('adminAuthForm');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminAuthError = document.getElementById('adminAuthError');

    const addMemberModal = document.getElementById('addMemberModal');
    const addMemberClose = document.getElementById('addMemberClose');
    const addMemberForm = document.getElementById('addMemberForm');

    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const deleteConfirmClose = document.getElementById('deleteConfirmClose');
    const deleteConfirmMessage = document.getElementById('deleteConfirmMessage');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    if (addMemberForm && !document.getElementById('avatarDropzone')) {
        const dropzoneContainer = document.createElement('div');
        dropzoneContainer.innerHTML = `
            <label>Profile Picture</label>
            <div class="avatar-upload-dropzone" id="avatarDropzone">
                <span class="upload-icon">+</span>
                <span class="upload-text">Upload Image</span>
                <img class="upload-preview-img" id="avatarPreviewImg" alt="Preview">
                <input type="file" id="avatarFileInput" accept="image/*">
            </div>
        `;
        addMemberForm.insertBefore(dropzoneContainer, addMemberForm.firstChild);

        const avatarFileInput = document.getElementById('avatarFileInput');
        const avatarDropzone = document.getElementById('avatarDropzone');
        const avatarPreviewImg = document.getElementById('avatarPreviewImg');

        avatarFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentUploadedBase64 = event.target.result;
                    avatarPreviewImg.src = currentUploadedBase64;
                    avatarDropzone.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (adminTriggerBtn) {
        let isDragging = false;
        let startTouchY = 0;
        let startTop = 0;
        let hasDragged = false;

        const onStart = (e) => {
            isDragging = true;
            hasDragged = false;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            startTouchY = clientY;
            startTop = adminTriggerBtn.getBoundingClientRect().top;
            adminTriggerBtn.style.transition = 'none';
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const deltaY = clientY - startTouchY;

            if (Math.abs(deltaY) > 5) hasDragged = true;

            const newTop = Math.max(10, Math.min(window.innerHeight - 54, startTop + deltaY));
            adminTriggerBtn.style.top = `${newTop}px`;
            adminTriggerBtn.style.transform = 'none';

            if (clientX > window.innerWidth / 2) {
                adminTriggerBtn.style.left = 'auto';
                adminTriggerBtn.style.right = '12px';
            } else {
                adminTriggerBtn.style.right = 'auto';
                adminTriggerBtn.style.left = '12px';
            }
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            adminTriggerBtn.style.transition = 'top 0.2s ease, left 0.2s ease, right 0.2s ease, box-shadow 0.3s ease';
        };

        adminTriggerBtn.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);

        adminTriggerBtn.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);

        adminTriggerBtn.addEventListener('click', (e) => {
            if (hasDragged) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return;
            }
            if (isAdmin) {
                isAdmin = false;
                document.body.classList.remove('admin-mode');
                adminTriggerBtn.classList.remove('admin-active');
                const { auth, signOut } = window.firestoreService;
                signOut(auth).catch(err => console.error("Error signing out:", err));
            } else {
                if (adminPasswordInput) adminPasswordInput.value = '';
                if (adminAuthError) adminAuthError.style.display = 'none';
                adminAuthModal.classList.add('open');
            }
        });
    }

    if (adminAuthClose) adminAuthClose.addEventListener('click', () => closeModal(adminAuthModal));

    if (adminAuthForm) {
        adminAuthForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (adminPasswordInput.value === 'password') {
                const { auth, signInAnonymously } = window.firestoreService;
                try {
                    await signInAnonymously(auth);
                    isAdmin = true;
                    document.body.classList.add('admin-mode');
                    adminTriggerBtn.classList.add('admin-active');
                    closeModal(adminAuthModal);
                } catch (err) {
                    console.error("Error signing in to Firebase Auth:", err);
                    if (adminAuthError) {
                        adminAuthError.textContent = 'Could not authenticate. Check console for details.';
                        adminAuthError.style.display = 'block';
                    }
                }
            } else {
                if (adminAuthError) {
                    adminAuthError.textContent = 'Invalid password!';
                    adminAuthError.style.display = 'block';
                }
            }
        });
    }

    document.querySelectorAll('.add-card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            cardToEdit = null;
            currentUploadedBase64 = '';
            
            const dropzone = document.getElementById('avatarDropzone');
            if (dropzone) dropzone.classList.remove('has-image');
            
            const section = btn.dataset.targetSection;
            document.getElementById('addTargetSection').value = section;
            document.getElementById('addModalTitle').textContent = section === 'officers' ? 'Add New Officer' : 'Add New Member';
            document.getElementById('addUsername').value = '';
            document.getElementById('addNickname').value = '';
            document.getElementById('addJoined').value = 'Sep 2026';
            document.getElementById('addRank').value = section === 'officers' ? 'Leader' : 'Member';
            document.getElementById('addSpecialty').value = '';
            document.getElementById('addBio').value = '';
            addMemberModal.classList.add('open');
        });
    });

    if (addMemberClose) addMemberClose.addEventListener('click', () => closeModal(addMemberModal));

    if (addMemberForm) {
        addMemberForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const section = document.getElementById('addTargetSection').value;
            const username = document.getElementById('addUsername').value.trim();
            const nickname = document.getElementById('addNickname').value.trim();
            const joined = document.getElementById('addJoined').value.trim() || 'Sep 2026';
            const rank = document.getElementById('addRank').value.trim() || (section === 'officers' ? 'Leader' : 'Member');
            const specialty = document.getElementById('addSpecialty').value.trim() || 'General';
            const bio = document.getElementById('addBio').value.trim() || `${username} joined the roster.`;

            const { db, collection, addDoc, doc, updateDoc, auth, signInAnonymously } = window.firestoreService;

            // Ensure active authentication session before any write
            try {
                if (!auth.currentUser) {
                    await signInAnonymously(auth);
                }
            } catch (authErr) {
                console.error("Auth session recovery failed:", authErr);
                alert("Authentication failed. Check your network or Firebase configuration.");
                return;
            }

            if (cardToEdit) {
                const docId = cardToEdit.dataset.id;
                const docRef = doc(db, "roster", docId);
                const updatedFields = {
                    name: username,
                    nickname: nickname || username,
                    joined: joined,
                    rank: rank,
                    specialty: specialty,
                    bio: bio,
                    section: section
                };

                if (currentUploadedBase64) {
                    updatedFields.avatarUrl = currentUploadedBase64;
                }

                try {
                    await updateDoc(docRef, updatedFields);
                } catch (err) {
                    console.error("Error updating document in Firestore:", err);
                    alert("Couldn't save changes to the server (permission or connection issue). Check the console for details — this edit was NOT persisted.");
                    return;
                }

                cardToEdit = null;
            } else {
                const hue = Math.floor(Math.random() * 360);
                const newMemberData = {
                    section: section,
                    name: username,
                    nickname: nickname || username,
                    joined: joined,
                    rank: rank,
                    specialty: specialty,
                    bio: bio,
                    hue: hue,
                    avatarUrl: currentUploadedBase64 || ""
                };

                try {
                    await addDoc(collection(db, "roster"), newMemberData);
                } catch (err) {
                    console.error("Error saving new document to Firestore:", err);
                    alert("Couldn't save this entry to the server (permission or connection issue). Check the console for details — it will disappear on refresh.");
                    return;
                }
            }

            addMemberForm.reset();
            currentUploadedBase64 = '';
            const dropzone = document.getElementById('avatarDropzone');
            if (dropzone) dropzone.classList.remove('has-image');
            closeModal(addMemberModal);
        });
    }

    function attachAdminCardListeners(card) {
        const deleteBtn = card.querySelector('.card-delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cardToDelete = card;
                const name = card.dataset.name || 'this entry';
                deleteConfirmMessage.textContent = `Are you sure you want to delete ${name}?`;
                deleteConfirmModal.classList.add('open');
            });
        }

        const editBtn = card.querySelector('.card-edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cardToEdit = card;

                const isOfficerSection = card.closest('#officersPanel') !== null;
                document.getElementById('addTargetSection').value = isOfficerSection ? 'officers' : 'members';
                document.getElementById('addModalTitle').textContent = `Edit Record: ${card.dataset.name}`;
                
                const dropzone = document.getElementById('avatarDropzone');
                const avatarPreviewImg = document.getElementById('avatarPreviewImg');
                currentUploadedBase64 = card.dataset.avatarUrl || '';

                if (currentUploadedBase64 && dropzone && avatarPreviewImg) {
                    avatarPreviewImg.src = currentUploadedBase64;
                    dropzone.classList.add('has-image');
                } else if (dropzone) {
                    dropzone.classList.remove('has-image');
                }

                document.getElementById('addUsername').value = card.dataset.name || '';
                document.getElementById('addNickname').value = card.dataset.nickname || '';
                document.getElementById('addJoined').value = card.dataset.joined || '';
                document.getElementById('addRank').value = card.dataset.rank || '';
                document.getElementById('addSpecialty').value = card.dataset.specialty || '';
                document.getElementById('addBio').value = card.dataset.bio || '';

                addMemberModal.classList.add('open');
            });
        }
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            if (cardToDelete) {
                const docId = cardToDelete.dataset.id;
                const { db, doc, deleteDoc, auth, signInAnonymously } = window.firestoreService;
                try {
                    if (!auth.currentUser) {
                        await signInAnonymously(auth);
                    }
                    await deleteDoc(doc(db, "roster", docId));
                } catch (err) {
                    console.error("Error deleting entry from Firestore:", err);
                    alert("Couldn't delete this entry on the server (permission or connection issue). Check the console for details — it will reappear on refresh.");
                }
                cardToDelete = null;
            }
            closeModal(deleteConfirmModal);
        });
    }

    if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => closeModal(deleteConfirmModal));
    if (deleteConfirmClose) deleteConfirmClose.addEventListener('click', () => closeModal(deleteConfirmModal));

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });
});