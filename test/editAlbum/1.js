
const tagsModule = ((_config) => {
    const defaultConfig = {
        allowDuplicates: false,
        tagMaxOuterWidth: (16 * 2) + 80 // SCSS: ($gutter-size * 2) + $tag-max-width
    };
    const config = Object.assign({}, defaultConfig, _config);

    const DOM = {
        getNewTagElement: (value) => {
            const newElement = document.createElement('span');

            newElement.classList.add('tag');

            const newElementTextNode = document.createTextNode(value);

            newElement.appendChild(newElementTextNode);

            return newElement;
        },
        container: document.querySelector('.tag-list-container'),
        getTags: () => {
            return document.querySelectorAll('.tag');
        },
        input: document.querySelector('.tag-list-input'),
        getLastTag: () => {
            const tags = DOM.getTags();

            return tags[tags.length - 1];
        },
        showTextTag: document.querySelector('.tag.showtext')
    };
    const dispatch = (() => {
        let events = [];

        return (event) => {
            events.push(event);

            switch (event.action) {
                case 'ADD_TAG':
                    addTag(event.text);

                    break;
                case 'REMOVE_TAG':
                    removeTag(event.tag);

                    break;
                case 'HIGHLIGHT_TAG':
                    highlightTag(event.tag);

                    break;
            }
        };
    })();

    const attachFocusEvent = () => {
        const focusInput = () => {
            DOM.input.focus();
        };

        DOM.container.addEventListener('click', focusInput);
    };

    const attachSelectionEventListener = (tag) => {
        tag.addEventListener('click', (clickEvent) => {
            clickEvent.stopPropagation();
        });
    };

    const attachTagSelectionEvents = () => {
        DOM.getTags().forEach(attachSelectionEventListener);
    };

    const attachHoverEventListener = (tag) => {
        const showFullTextTag = (tagFullText) => {
            DOM.showTextTag.innerText = tagFullText;
            DOM.showTextTag.classList.add('active');
        };


    };

    const attachTagFocusEvents = () => {
        DOM.getTags().forEach(attachHoverEventListener);
    };

    const addTag = (newTagText) => {
        const newTag = DOM.getNewTagElement(newTagText);

        DOM.container.insertBefore(newTag, DOM.input);

        attachSelectionEventListener(newTag);
        attachHoverEventListener(newTag);
        clearInput();

        return newTag;
    };

    const clearInput = () => {
        DOM.input.value = '';
    };

    const removeTag = (tag) => {
        tag.remove();
    };

    const highlightTag = (() => {
        const highlightDurationMs = 500;
        let removeHighlightTimeout;

        return (tag) => {
            if (removeHighlightTimeout) {
                return false;
            }

            tag.classList.add('highlighted');

            removeHighlightTimeout = setTimeout(() => {
                tag.classList.remove('highlighted');
                removeHighlightTimeout = null;
            }, highlightDurationMs);

            return true;
        };
    })();

    const attachInputKeydownEvents = (allowDuplicates) => {
        const isKey = (keydownEvent) => {
            const key = keydownEvent.which || keydownEvent.keyCode || 0;

            return {
                backspace: key === 8,
                enter: key === 13
            };
        };

        const inputIsEmpty = () => !(DOM.input.value.length);

        const getTagDuplicate = () => {
            const newTagText = DOM.input.value;
            let duplicateTag;

            DOM.getTags().forEach((tag) => {
                const isDuplicate = tag.innerText === newTagText;

                if (isDuplicate) {
                    duplicateTag = tag;
                }

                return !isDuplicate;
            });

            return duplicateTag;
        };

        const handleInputKeydown = (keydownEvent) => {
            if (isKey(keydownEvent).backspace && inputIsEmpty()) {
                dispatch({
                    action: 'REMOVE_TAG',
                    tag: DOM.getLastTag()
                });
            } else if (isKey(keydownEvent).enter && !inputIsEmpty()) {
                if (!allowDuplicates) {
                    const duplicateTag = getTagDuplicate();

                    if (duplicateTag) {
                        dispatch({
                            action: 'HIGHLIGHT_TAG',
                            tag: duplicateTag
                        });

                        return false;
                    }
                }

                dispatch({
                    action: 'ADD_TAG',
                    text: DOM.input.value
                });

                return true;
            }
        };

        DOM.input.addEventListener('keydown', handleInputKeydown);
    };

    const attachFocusedEvent = () => {
        DOM.input.addEventListener('focus', (focusEvent) => {
            DOM.container.classList.add('focused');
        });

        DOM.input.addEventListener('blur', (focusEvent) => {
            DOM.container.classList.remove('focused');
        });
    };

    const init = () => {
        attachFocusEvent();
        attachTagSelectionEvents();
        attachTagFocusEvents(config.tagMaxOuterWidth);
        attachInputKeydownEvents(config.allowDuplicates);
        attachFocusedEvent();
    };

    init();

    return {
        addTag: addTag
    };
})();


/*

var $formElements = $('input, textarea');
var $selects = $('select option:selected:not([disabled])').parent();
var $autofill = $('input:-webkit-autofill').length > 0;
$formElements.add($selects, $autofill);

$formElements.each(function() {
    $selects.addClass('hasValue');
    if( this.value ) {
        $(this).addClass('hasValue');
    } else {
        $(this).removeClass('hasValue');
    }
});

$('input, select, textarea').on('load autocompletechange change', function() {
    if( this.value ) {
        $(this).addClass('hasValue');
    } else {
        $(this).removeClass('hasValue');
    }
});

*/

