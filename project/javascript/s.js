const domElements = {
    wrapper: document.querySelector('.wrapper'),
    firstPage: document.querySelector('.wrapperFirstPage'),
    chooseLanding: document.querySelector('.wrapperFirstPage__main-chooseLanding'),
    lampPage: document.querySelector('.wrapperLampPage'),
    millingPage: document.querySelector('.wrapperMillingPage'),
};

const domElementsLeftLamp = {
    dropDownLampLeft: document.querySelectorAll('input[name="custom-select-left"]'),
    titleLampLeft: document.querySelector('.wrapperLampPage__main-selectedPictures-left-text'),
    leftImgLamp: document.querySelector('.wrapperLampPage__main-selectedPictures-left-img'),
    powerLeftLampText: document.querySelector('.power-left-lamp-text'),
    diodesLeftText: document.querySelector('.diodes-left-lamp-text'),
    standLeftLampImg: document.querySelector('.stand-left-lamp-img'),
    standLeftLampText: document.querySelector('.stand-left-lamp-text'),
    recommendedLampLeftImg: document.querySelector('.recommended-left-lamp-img'),
    recommendedLampLeftText: document.querySelector('.recommended-left-lamp-text'),
    handLampLeftImg: document.querySelector('.hand-lamp-left-img'),
    handLampLeftText: document.querySelector('.hand-lamp-text-left'),
    timerLeftLampText: document.querySelector('.timer-left-lamp-text'),
    sizeLeftLamptext: document.querySelector('.size-left-lamp-text'),
};

const domElementsRightLamp = {
    dropDownLampRight: document.querySelectorAll('input[name="custom-select-right"]'),
    titleLampRight: document.querySelector('.wrapperLampPage__main-selectedPictures-right-text'),
    rightImgLamp: document.querySelector('.wrapperLampPage__main-selectedPictures-right-img'),
    powerRightLampText: document.querySelector('.power-right-lamp-text'),
    diodesRightText: document.querySelector('.diodes-right-lamp-text'),
    standRightLampImg: document.querySelector('.stand-right-lamp-img'),
    standRightLampText: document.querySelector('.stand-right-lamp-text'),
    recommendedLampRightImg: document.querySelector('.recommended-right-lamp-img'),
    recommendedLampRightText: document.querySelector('.recommended-right-lamp-text'),
    handLampRightImg: document.querySelector('.hand-lamp-right-img'),
    handLampRightText: document.querySelector('.hand-lamp-text-right'),
    timerRightLampText: document.querySelector('.timer-right-lamp-text'),
    sizeRightLamptext: document.querySelector('.size-right-lamp-text'),
};

const domElementsLeftMilling = {
    dropDownMillingLeft: document.querySelectorAll('input[name="custom-select-left-milling"]'),
    titleMillingLeft: document.querySelector('.wrapperMillingPage__main-selectedPictures-left-text'),
    leftImgMilling: document.querySelector('.wrapperMillingPage__main-selectedPictures-left-img'),
    powerLeftMillingText: document.querySelector('.power-left-milling-text'),
    speedLeftText: document.querySelector('.speed-left-milling-text'),
    cuttersLeftMillingText: document.querySelector('.cutters-milling-text-left'),
    purposeMillingLeftImg: document.querySelector('.purpose-left-milling-img'),
    purposeMillingLeftText: document.querySelector('.purpose-left-milling-text'),
    recommendedMillingLeftImg: document.querySelector('.recommended-left-milling-img'),
    recommendedMillingLeftText: document.querySelector('.recommended-left-milling-text'),
    supplyTypeLeftMillingImg: document.querySelector('.supply-type-left-milling-img'),
    supplyTypeLeftMillingText: document.querySelector('.supply-type-left-milling-text'),
    ulContainersLeftMilling: document.querySelectorAll('.wrapperMillingPage__main-parametersContainer-parameters-left-text-ul'),
    sizesLeftMilling: document.querySelector('.dimension-left-milling-text'),
    weightLeftMilling: document.querySelector('.weight-left-milling-text'),
    ulContainersLeftMillingAdditional: document.querySelectorAll('.wrapperMillingPage__main-parametersContainer-parameters-left-textAdditional-ul')
};

const domElementsRightMilling = {
    dropDownMillingRight: document.querySelectorAll('input[name="custom-select-right-milling"]'),
    titleMillingRight: document.querySelector('.wrapperMillingPage__main-selectedPictures-right-text'),
    rightImgMilling: document.querySelector('.wrapperMillingPage__main-selectedPictures-right-img'),
    powerRightMillingText: document.querySelector('.power-right-milling-text'),
    speedRightText: document.querySelector('.speed-right-milling-text'),
    cuttersRightMillingText: document.querySelector('.cutters-milling-right-text'),
    purposeMillingRightImg: document.querySelector('.purpose-right-milling-img'),
    purposeMillingRightText: document.querySelector('.purpose-right-milling-text'),
    recommendedMillingRightImg: document.querySelector('.recommended-right-milling-img'),
    recommendedMillingRightText: document.querySelector('.recommended-right-milling-text'),
    supplyTypeRightMillingImg: document.querySelector('.supply-type-right-milling-img'),
    supplyTypeRightMillingText: document.querySelector('.supply-type-right-milling-text'),
    ulContainersRightMilling: document.querySelectorAll('.wrapperMillingPage__main-parametersContainer-parameters-right-text-ul'),
    sizesRightMilling: document.querySelector('.dimension-right-milling-text'),
    weightRightMilling: document.querySelector('.weight-right-milling-text'),
    ulContainersRightMillingAdditional: document.querySelectorAll('.wrapperMillingPage__main-parametersContainer-parameters-right-textAdditional-ul')
};

const messageHandlers = {
    initializeMessageHandlers() {
        const { wrapper } = domElements;

        const sendHeight = () => {
            const message = {
                name: 'sm_51689_dynamic_height',
                value: wrapper.getBoundingClientRect().height,
            };
            window.parent.postMessage(message, '*');
        };

        sendHeight();
        window.addEventListener('load', sendHeight);
        window.addEventListener('resize', sendHeight);
    }
};

const dataFetcher = {
    initializeDataFetcher: async function () {
        const getJsonValues = async link => {
            const response = await fetch(link);
            const data = await response.text();
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            const jsonResponse = htmlDocument.querySelector('body').textContent.trim();
            const dataArray = JSON.parse(jsonResponse);
            return dataArray;
        };

        const lampValues = await getJsonValues('https://app3.salesmanago.pl/ms/hwemk96sgbtjrs74/default/lamps_json.htm');
        const millingValues = await getJsonValues('https://app3.salesmanago.pl/ms/hwemk96sgbtjrs74/default/millings_json.htm');

        return { lampValues, millingValues };
    }
};

const utilityMethods = {
    initializeUtilities() {
        const {
            firstPage,
            lampPage,
            millingPage
        } = domElements;

        const {
            titleLampLeft,
            powerLeftLampText,
            leftImgLamp,
            standLeftLampImg,
            standLeftLampText,
            recommendedLampLeftImg,
            recommendedLampLeftText,
            diodesLeftText,
            handLampLeftImg,
            handLampLeftText,
            timerLeftLampText,
            sizeLeftLamptext,
            dropDownLampLeft
        } = domElementsLeftLamp;

        const {
            titleLampRight,
            powerRightLampText,
            rightImgLamp,
            standRightLampImg,
            standRightLampText,
            recommendedLampRightImg,
            recommendedLampRightText,
            diodesRightText,
            handLampRightImg,
            handLampRightText,
            timerRightLampText,
            sizeRightLamptext,
            dropDownLampRight
        } = domElementsRightLamp;

        const {
            titleMillingLeft,
            leftImgMilling,
            powerLeftMillingText,
            speedLeftText,
            cuttersLeftMillingText,
            purposeMillingLeftImg,
            purposeMillingLeftText,
            recommendedMillingLeftImg,
            recommendedMillingLeftText,
            supplyTypeLeftMillingImg,
            supplyTypeLeftMillingText,
            ulContainersLeftMilling,
            sizesLeftMilling,
            weightLeftMilling,
            ulContainersLeftMillingAdditional,
            dropDownMillingLeft
        } = domElementsLeftMilling;

        const {
            titleMillingRight,
            rightImgMilling,
            powerRightMillingText,
            speedRightText,
            cuttersRightMillingText,
            purposeMillingRightImg,
            purposeMillingRightText,
            recommendedMillingRightImg,
            recommendedMillingRightText,
            supplyTypeRightMillingImg,
            supplyTypeRightMillingText,
            ulContainersRightMilling,
            sizesRightMilling,
            weightRightMilling,
            ulContainersRightMillingAdditional,
            dropDownMillingRight
        } = domElementsRightMilling;

        const showLanding = e => {
            if (e.target.classList.contains('wrapperFirstPage__main-chooseLanding-left-img')) {
                firstPage.classList.add('hidden');
                lampPage.classList.add('show');
            } else if (e.target.classList.contains('wrapperFirstPage__main-chooseLanding-right-img')) {
                firstPage.classList.add('hidden');
                millingPage.classList.add('show');
            }
        };

        const scrollOnClick = containerId => containerId.scrollIntoView({ behavior: 'smooth' });

        const getSelectedItemId = (chooseSide, type) => {
            const name = type === 'lamp' ? 'custom-select-' + chooseSide : 'custom-select-' + chooseSide + '-milling';
            const selectedRadio = document.querySelector('input[name="' + name + '"]:checked');
            return selectedRadio ? selectedRadio.id : false;
        };

        const handleDynamicContentLamp = (selectedId, side) => {
            const titleLamp = side === 'left' ? titleLampLeft : titleLampRight;
            const imgElement = side === 'left' ? leftImgLamp : rightImgLamp;
            const powerTextElement = side === 'left' ? powerLeftLampText : powerRightLampText;
            const diodesTextElement = side === 'left' ? diodesLeftText : diodesRightText;
            const standImgElement = side === 'left' ? standLeftLampImg : standRightLampImg;
            const standTextElement = side === 'left' ? standLeftLampText : standRightLampText;
            const recommendedTextElement = side === 'left' ? recommendedLampLeftText : recommendedLampRightText;
            const recommendedImgElement = side === 'left' ? recommendedLampLeftImg : recommendedLampRightImg;
            const handImgElement = side === 'left' ? handLampLeftImg : handLampRightImg;
            const handTextElement = side === 'left' ? handLampLeftText : handLampRightText;
            const timerTextElement = side === 'left' ? timerLeftLampText : timerRightLampText;
            const sizeTextElement = side === 'left' ? sizeLeftLamptext : sizeRightLamptext;

            dataFetcher.initializeDataFetcher()
                .then(data => {
                    const selectedLamp = data.lampValues.find(lamps => lamps.id === parseInt(selectedId));

                    titleLamp.textContent = selectedLamp.name;
                    imgElement.src = selectedLamp.img;
                    powerTextElement.textContent = selectedLamp.devicePower;
                    diodesTextElement.textContent = selectedLamp.ledCount;
                    standImgElement.src = selectedLamp.removableBaseImg;
                    standTextElement.textContent = selectedLamp.removableBase;
                    recommendedImgElement.src = selectedLamp.experienceImg;
                    recommendedTextElement.textContent = selectedLamp.experience;
                    handImgElement.src = selectedLamp.handInLampImg;
                    handTextElement.textContent = selectedLamp.handInLamp;
                    timerTextElement.textContent = selectedLamp.builtInTimer;
                    sizeTextElement.textContent = selectedLamp.dimensions;
                });
        };

        const handleDynamicContentMilling = (selectedId, side) => {
            const title = side === 'left' ? titleMillingLeft : titleMillingRight;
            const imgElement = side === 'left' ? leftImgMilling : rightImgMilling;
            const powerTextElement = side === 'left' ? powerLeftMillingText : powerRightMillingText;
            const speedControlTextElement = side === 'left' ? speedLeftText : speedRightText;
            const cuttersText = side === 'left' ? cuttersLeftMillingText : cuttersRightMillingText;
            const purposeImg = side === 'left' ? purposeMillingLeftImg : purposeMillingRightImg;
            const purposeText = side === 'left' ? purposeMillingLeftText : purposeMillingRightText;
            const recommendedImg = side === 'left' ? recommendedMillingLeftImg : recommendedMillingRightImg;
            const recommendedText = side === 'left' ? recommendedMillingLeftText : recommendedMillingRightText;
            const supplyTypeImg = side === 'left' ? supplyTypeLeftMillingImg : supplyTypeRightMillingImg;
            const supplyTypeText = side === 'left' ? supplyTypeLeftMillingText : supplyTypeRightMillingText;
            const ulItems = side === 'left' ? ulContainersLeftMilling : ulContainersRightMilling;
            const sizes = side === 'left' ? sizesLeftMilling : sizesRightMilling;
            const weight = side === 'left' ? weightLeftMilling : weightRightMilling;
            const additionalText = side === 'left' ? ulContainersLeftMillingAdditional : ulContainersRightMillingAdditional;

            dataFetcher.initializeDataFetcher()
                .then(data => {
                    const selectedMilling = data.millingValues.millings.find(millings => millings.id === parseInt(selectedId));
                    const equipmentTextLength = selectedMilling.equipment.length;

                    title.textContent = selectedMilling.name;
                    imgElement.src = selectedMilling.img;
                    powerTextElement.textContent = selectedMilling.power;
                    speedControlTextElement.textContent = selectedMilling.rotations;
                    cuttersText.textContent = selectedMilling.cutters;
                    purposeImg.src = selectedMilling.purposeImg;
                    purposeText.textContent = selectedMilling.purpose;
                    recommendedImg.src = selectedMilling.forWhomImg;
                    recommendedText.textContent = selectedMilling.forWhom;
                    supplyTypeImg.src = selectedMilling.powerSupplyImg;
                    supplyTypeText.textContent = selectedMilling.powerSupply;
                    sizes.textContent = selectedMilling.dimensions;
                    weight.textContent = selectedMilling.weight;

                    ulItems.forEach(ul => {
                        ul.innerHTML = '';
                        for (let i = 0; i < equipmentTextLength; i++) {
                            const liElements = document.createElement('li');
                            liElements.textContent = selectedMilling.equipment[i];
                            ul.appendChild(liElements);
                        }
                    });

                    additionalText.forEach(ul => {
                        ul.innerHTML = '';
                        for (let i = 0; i < selectedMilling.additionalText.length; i++) {
                            const liElements = document.createElement('li');
                            liElements.textContent = selectedMilling.additionalText[i];
                            ul.appendChild(liElements);
                        }
                    });
                });
        };

        const disableSelectedOptions = () => {
            const { dropDownLampLeft } = domElementsLeftLamp;
            const { dropDownLampRight } = domElementsRightLamp;
            const { dropDownMillingLeft } = domElementsLeftMilling;
            const { dropDownMillingRight } = domElementsRightMilling;

            const disableOptions = (selectedOption, options) => {
                options.forEach(option => {
                    if (option.id.split('r').join('') === selectedOption.id.split('l').join('') || option.id.split('l').join('') === selectedOption.id.split('r').join('')) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });
            };

            const initializeDisabledOptions = () => {
                const selectedLeftLampOption = document.querySelector('input[name="custom-select-left"]:checked');
                const selectedRightLampOption = document.querySelector('input[name="custom-select-right"]:checked');
                const selectedLeftMillingOption = document.querySelector('input[name="custom-select-left-milling"]:checked');
                const selectedRightMillingOption = document.querySelector('input[name="custom-select-right-milling"]:checked');

                if (selectedLeftLampOption) disableOptions(selectedLeftLampOption, dropDownLampRight);
                if (selectedRightLampOption) disableOptions(selectedRightLampOption, dropDownLampLeft);
                if (selectedLeftMillingOption) disableOptions(selectedLeftMillingOption, dropDownMillingRight);
                if (selectedRightMillingOption) disableOptions(selectedRightMillingOption, dropDownMillingLeft);
            };

            dropDownLampLeft.forEach(option => {
                option.addEventListener('change', () => {
                    const selectedOption = document.querySelector('input[name="custom-select-left"]:checked');
                    disableOptions(selectedOption, dropDownLampRight);
                });
            });

            dropDownLampRight.forEach(option => {
                option.addEventListener('change', () => {
                    const selectedOption = document.querySelector('input[name="custom-select-right"]:checked');
                    disableOptions(selectedOption, dropDownLampLeft);
                });
            });

            dropDownMillingLeft.forEach(option => {
                option.addEventListener('change', () => {
                    const selectedOption = document.querySelector('input[name="custom-select-left-milling"]:checked');
                    disableOptions(selectedOption, dropDownMillingRight);
                });
            });

            dropDownMillingRight.forEach(option => {
                option.addEventListener('change', () => {
                    const selectedOption = document.querySelector('input[name="custom-select-right-milling"]:checked');
                    disableOptions(selectedOption, dropDownMillingLeft);
                });
            });

            initializeDisabledOptions();
        };

        disableSelectedOptions();

        const manipulateContent = () => {
            const selectedIdLeftLamp = getSelectedItemId('left', 'lamp');
            const selectedIdRightLamp = getSelectedItemId('right', 'lamp');
            const selectedIdLeftMilling = getSelectedItemId('left', 'milling');
            const selectedIdRightMilling = getSelectedItemId('right', 'milling');

            if (selectedIdLeftLamp) handleDynamicContentLamp(selectedIdLeftLamp, 'left');
            if (selectedIdRightLamp) handleDynamicContentLamp(selectedIdRightLamp, 'right');
            if (selectedIdLeftMilling) handleDynamicContentMilling(selectedIdLeftMilling, 'left');
            if (selectedIdRightMilling) handleDynamicContentMilling(selectedIdRightMilling, 'right');
        };

        manipulateContent();

        return { showLanding, getSelectedItemId, manipulateContent, scrollOnClick };
    }
};

const userInteractionHandlers = {
    initializeUserInteractionEvents() {
        const { chooseLanding, arrowLamp, arrowMilling, lampContainer, lampPage, millingPage } = domElements;
        const { dropDownLampLeft } = domElementsLeftLamp;
        const { dropDownLampRight } = domElementsRightLamp;
        const { dropDownMillingLeft } = domElementsLeftMilling;
        const { dropDownMillingRight } = domElementsRightMilling;
        const { showLanding, manipulateContent, scrollOnClick } = utilityMethods.initializeUtilities();

        const dropDownSelect = dropdown => dropdown.forEach(input => input.addEventListener('change', manipulateContent));

        document.addEventListener('click', e => {
            const target = e.target.closest('.arrow');
            if (!target) return;
            const containerId = e.target.dataset.scrollTo;
            const container = document.getElementById(containerId);

            if (container) scrollOnClick(container);
        });

        dropDownSelect(dropDownLampLeft);
        dropDownSelect(dropDownLampRight);
        dropDownSelect(dropDownMillingLeft);
        dropDownSelect(dropDownMillingRight);

        chooseLanding.addEventListener('click', e => showLanding(e));

    }
};

const main = () => {
    messageHandlers.initializeMessageHandlers();
    userInteractionHandlers.initializeUserInteractionEvents();
};

document.addEventListener('DOMContentLoaded', () => main());
