document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Tab Switching Controls
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
       2. Member Search Filter
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
       3. Modal Details Engine
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
                    const cardImage = card.querySelector('img.avatar');
                    if (cardImage && cardImage.getAttribute('src')) {
                        const imgElement = document.createElement('img');
                        imgElement.src = cardImage.getAttribute('src');
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

    document.querySelectorAll('.person-card').forEach(attachCardClickListener);

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
       4. Visual Drag & Swipe Gesture Handler
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
       5. Admin Engine & Image Dropzone
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
            } else {
                if (adminPasswordInput) adminPasswordInput.value = '';
                if (adminAuthError) adminAuthError.style.display = 'none';
                adminAuthModal.classList.add('open');
            }
        });
    }

    if (adminAuthClose) adminAuthClose.addEventListener('click', () => closeModal(adminAuthModal));

    if (adminAuthForm) {
        adminAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (adminPasswordInput.value === 'password') {
                isAdmin = true;
                document.body.classList.add('admin-mode');
                adminTriggerBtn.classList.add('admin-active');
                closeModal(adminAuthModal);
            } else {
                if (adminAuthError) adminAuthError.style.display = 'block';
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
        addMemberForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const section = document.getElementById('addTargetSection').value;
            const avatarUrl = currentUploadedBase64;
            const username = document.getElementById('addUsername').value.trim();
            const nickname = document.getElementById('addNickname').value.trim();
            const joined = document.getElementById('addJoined').value.trim() || 'Sep 2026';
            const rank = document.getElementById('addRank').value.trim() || (section === 'officers' ? 'Leader' : 'Member');
            const specialty = document.getElementById('addSpecialty').value.trim() || 'General';
            const bio = document.getElementById('addBio').value.trim() || `${username} joined the roster.`;

            if (cardToEdit) {
                cardToEdit.dataset.name = username;
                cardToEdit.dataset.nickname = nickname || username;
                cardToEdit.dataset.joined = joined;
                cardToEdit.dataset.rank = rank;
                cardToEdit.dataset.specialty = specialty;
                cardToEdit.dataset.bio = bio;
                if (avatarUrl) cardToEdit.dataset.avatarUrl = avatarUrl;

                const positionTitleEl = cardToEdit.querySelector('.position-title');
                if (positionTitleEl) positionTitleEl.textContent = rank;

                const avatarContainer = cardToEdit.querySelector('.card-visual');
                if (avatarContainer) {
                    const existingAvatar = avatarContainer.querySelector('.avatar');
                    if (existingAvatar) existingAvatar.remove();

                    const activeAvatar = cardToEdit.dataset.avatarUrl;
                    if (activeAvatar) {
                        const img = document.createElement('img');
                        img.className = 'avatar';
                        img.src = activeAvatar;
                        img.alt = username;
                        avatarContainer.appendChild(img);
                    } else {
                        const div = document.createElement('div');
                        div.className = 'avatar';
                        div.textContent = username.charAt(0).toUpperCase();
                        avatarContainer.appendChild(div);
                    }
                }

                const rankEl = cardToEdit.querySelector('.person-rank');
                if (rankEl) rankEl.textContent = rank.toUpperCase();

                const nameEl = cardToEdit.querySelector('.person-name');
                if (nameEl) nameEl.textContent = username;

                const nicknameEl = cardToEdit.querySelector('.person-nickname');
                if (nicknameEl) nicknameEl.textContent = nickname || username;

                cardToEdit = null;
            } else {
                const hue = Math.floor(Math.random() * 360);
                const grid = document.querySelector(`#${section}Panel .officer-grid`);
                if (!grid) return;

                const newCard = document.createElement('div');
                newCard.className = 'person-card';
                if (section === 'officers' && rank.toLowerCase() === 'leader') {
                    newCard.classList.add('person-card--leader');
                }
                newCard.style.setProperty('--hue', hue.toString());
                newCard.dataset.name = username;
                if (nickname) newCard.dataset.nickname = nickname;
                newCard.dataset.rank = rank;
                newCard.dataset.specialty = specialty;
                newCard.dataset.joined = joined;
                newCard.dataset.bio = bio;
                if (avatarUrl) newCard.dataset.avatarUrl = avatarUrl;

                const firstLetter = username.charAt(0).toUpperCase();
                const avatarHTML = avatarUrl 
                    ? `<img class="avatar" src="${avatarUrl}" alt="${username}">` 
                    : `<div class="avatar">${firstLetter}</div>`;

                const preHoverVisual = section === 'officers' 
                    ? `<span class="position-title">${rank}</span>` 
                    : `<span class="rank-icon">🛡</span>`;

                const nameWrapHTML = `
                    <div class="person-name-wrap">
                        <h3 class="person-name">${username}</h3>
                        <h3 class="person-nickname">${nickname || username}</h3>
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
                    <span class="person-rank">${rank.toUpperCase()}</span>
                    ${nameWrapHTML}
                `;

                grid.appendChild(newCard);
                attachCardClickListener(newCard);
                attachAdminCardListeners(newCard);
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

    document.querySelectorAll('.person-card').forEach(attachAdminCardListeners);

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (cardToDelete) {
                cardToDelete.remove();
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