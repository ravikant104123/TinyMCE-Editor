// /**
//  * View | Setup|Types| Note Template
//  * subpackage   Front End
//  * author       Manoj
//  * since        24th-Aug-2018
//  */

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import JqxValidator from 'jqwidgets-react/react_jqxvalidator';
// import JqxDropDownList from 'jqwidgets-react/react_jqxdropdownlist';
// import MultiSelectNestedCombobox from 'components/Common/Combobox/MultiSelectNestedCombobox.jsx';
// import JqxInput from 'jqwidgets-react/react_jqxinput';
// // import Editor from 'components/Common/Editor.jsx';
// import { Editor } from '@tinymce/tinymce-react';
// import { IDGenerator } from 'components/FormBuilder/utilities.js';

// import ShowOnModules from 'components/Common/ShowOnModules.jsx';
// import { connect } from 'react-redux';
// import { getModulesToLoadFacility, checkGridEditPermission, allCheckChange, focusLink} from "../../js/CommonFunctions.jsx";

// class NoteTemplateAddEdit extends Component {
//     constructor(props) {
//         super(props);
//         this.addNoteTemplate = this.addNoteTemplate.bind(this);
//         this.cancelNoteTemplate = this.cancelNoteTemplate.bind(this);
//         this.defaultModules = this.defaultModules.bind(this);
//         this.cancelNoteTemplate = this.cancelNoteTemplate.bind(this);
//         this.modulesFacilityRelation = this.modulesFacilityRelation.bind(this);
//         this.checkAccountSingleFacility = this.checkAccountSingleFacility.bind(this);
//         this.facilityChanged = this.facilityChanged.bind(this);
//         this.fromPage = "";
//         this.singleFacility = false;
//         this.facilitySource = "";
//         this.allModules = ["notepad"];
//         this.fieldLabel = {
//             "ims": lang('IMS'),
//             "activity_log": lang('ACTIVITY_LOG'),
//             "request_tracker": lang('REQUEST_TRACKER'),
//             "notepad": lang('NOTEPAD'),
//             "cmms": lang('CMMS')
//         };
        
//         //Added for note template editor
//         this.noteTemplate_content = "",
//         this.noteTemplate_original_content = ""
//     //----------------------------------------------------------------
//     }

//     modulesFacilityRelation(checkedModules) {
//         let me = this;
//         let to_show_modules = [];
//         let selected_facility_ids = [];
//         let facility_data = me.facilityDropDown.getSelectedItems();
//         if (facility_data.length != 0) {
//             let modulesArray = [];
//             let showModule = me.refs.showModule.refs;

//             let checked_all = this.facilityDropDown.getSelectedItems();

//             if (checked_all.length) {
//                 if (checked_all.length < 1) {
//                     let default_modules = me.defaultModules();
//                     me.refs.showModule.changeShowOn(default_modules, []);
//                 } else {
//                     if (checked_all[0].facility_id == "-1") {
//                         checked_all.shift();
//                     }
//                     let possible_module_array = [];
//                     for (let i = 0; i < checked_all.length; i++) {
//                         for (let j = 0; j < checked_all[i].modules.length; j++) {
//                             if (!possible_module_array.includes(checked_all[i].modules[j]['module_name'])) {
//                                 possible_module_array.push(checked_all[i].modules[j]['module_name']);
//                             }
//                         }
//                     }

//                     let modules_by_facility = [];

//                     me.allModules.forEach(function (module) {
//                         if (possible_module_array.indexOf(module) > -1) {
//                             modules_by_facility.push(module);
//                         }
//                         modules_by_facility.push('notepad');
//                     });
//                     to_show_modules = modules_by_facility;
//                 }
//             }

//         } else {
//             to_show_modules = me.props.userData.setup_module_permission['note-templates'];
//             to_show_modules.push("notepad");
//         }
//         if (me.fromPage == "edit_page") {
//             me.refs.showModule.changeShowOn(me.defaultModules(to_show_modules), checkedModules);
//         } else {
//             me.refs.showModule.changeShowOn(me.defaultModules(to_show_modules));
//         }

//     }

//     cancelNoteTemplate() {
//         this.props.history.push({
//             pathname: '/setup-navigation/note-templates',
//         });
//     }

//     /**
// 	* This function is used to set the default Modules in Show On Section
// 	* @return array
// 	**/
//     defaultModules(modulesArray) {

//         let modulesArr = [];        
//         let temp_module_array = ['ims','activity_log','request_tracker','cmms','notepad'];
//         temp_module_array.map(temp_element => {
//             this.allModules.map(element => {
//                 if (temp_element == element && modulesArray.indexOf(element) != -1) {
//                     modulesArr.push({ 'reference': element, 'fieldValue': this.fieldLabel[element] });
//                 }
//             });
//         });

//         return modulesArr;
//     }

//     componentDidMount() {
//         let me = this;
//         let mainParentDetails = {};
//         mainParentDetails.link = '/setup-navigation/note-templates'
//         mainParentDetails.breadcrumblinks = [{ link: "/", label: lang("HOME", "Home") }, { link: "/setup", label: lang("SETUP", "Setup") }, { last: true, label: lang("NOTE_TEMPLATES", "Note Templates") }],
//             mainParentDetails.showSaveCancelButton = true;
//         mainParentDetails.saveClick = [{ onClick: this.addNoteTemplate }],
//             mainParentDetails.cancelClick = [{ onClick: this.cancelNoteTemplate }],
//             this.props.changeBreadCrumData(mainParentDetails);
//             // this.props.callParent(mainParentDetails);
//             focusLink(mainParentDetails);

//         if (Object.keys(me.props.userData.account_facility).length == 1) {
//             $('.note-template-facility-dropdown').hide();
//         }

//         if (Object.keys(this.props.userData.account_facility).length == 1) {
//             this.singleFacility = true;
//         }

//         $.ajax({
//             datatype: 'json',
//             async: true,
//             // url: 'http://10.0.0.40:8000/C3/AccountFacility/getFacilityWithModules',
//             url: BASEURL + '/facility/getFacilityWithModules',
//             data: {
//                 data: JSON.stringify({ "return_modules": "yes", "modules": getModulesToLoadFacility(this.props.userData.setup_module_permission['note-templates'], this.props.userData.admin_for).toString() })
//             },
//             success: function (result) {
//                 if (result.data.length > 0) { 
//                     me.facilityDropDown.setOptions({source:result.data});
                    
//                     if (Object.keys(me.props.userData.account_facility).length == 1) {
//                         if(!me.props.match.params.id) {
//                             me.facilityDropDown.setValue(result.data[0].facility_id);
//                         }
//                     }
//                     $("#facility_dropdown_div").css("pointer-events","auto");
//                 } else {
//                     $("#facility_dropdown_div").css("pointer-events","none");
//                 }
//             }
//         });
        
        
//         me.note_template_name.focus();
//         if (me.props.match.params.id) {
//             me.fromPage = "edit_page";
//             $.ajax({
//                 // url: encodeURI('http://10.0.0.40:8000/Customer/Setup/Common/NoteTemplate/get?data=' + JSON.stringify({ "id": me.props.match.params.id })),
//                 url: encodeURI(BASEURL + '/noteTemplate?data=' + JSON.stringify({ "id": me.props.match.params.id })),
//                 type: "GET",
//                 success: function (data) {
//                     if (data.data) {
//                         me.note_template_name.val(data.data[0]['note_template_name']);
//                         data.data[0].facility_ids.forEach(element => {
//                             me.facilityDropDown.setValue(element.facility_id);
//                         });
//                         let checkedModules = [];

//                         me.props.userData.setup_module_permission['note-templates'].forEach(element => {
//                             if (me.props.userData.admin_for.includes(element) && data.data[0][element] == "1") {
//                                 checkedModules.push(element);
//                             }
//                         });

//                         if (data.data[0]['notepad'] == "1") {
//                             checkedModules.push('notepad');
//                         }
//                         me.modulesFacilityRelation(checkedModules);
//                         //me.noteTemplateContent.setContents(JSON.parse(data.data[0]['original_content']));
                        
//                         //----------------------------made changes for putting content----------------------

//                         window.tinymce.get('editor-template-content').setContent(JSON.parse(data.data[0]['original_content']));
//                         //---------------------------------------------

//                         checkGridEditPermission(me.props.userData, data.data[0], 'note-templates', true)
//                     }
//                 }

//             });
//         }
        
//         this.noteTemplateAddEditFormValidator.on('validationError', (event) => {
//             this.isFormValid = false;
//         });

//         this.noteTemplateAddEditFormValidator.on('validationSuccess', (event) => {
//             this.isFormValid = true;
//         });
//     }

//     facilityChanged () {
//         setTimeout(function () {
//             this.modulesFacilityRelation();
//         }.bind(this),100)
//     }
//     componentWillUnmount() {
//         this.props.changeBreadCrumData({});
//     }

//     checkAccountSingleFacility() {
//         let me = this;
//         setTimeout(() => {
//             if (Object.keys(this.props.userData.account_facility).length == 1) {
//                 $('.note-template-facility-dropdown').hide();
//                 this.facilityDropDown.checkAll();
//                 me.singleFacility = true;
//             }
//         }, 0);
//     }

//     //------------------------------changes--------------------------------

//     handleEditorChange = (e) => {
//         this.noteTemplate_content = e.target.getContent({format: 'text'}).trim();
//         this.noteTemplate_original_content = e.target.getContent();
//     }

//     onFileChange = (files) => {
//         let isInvalidFile = false;
//         let filesToUpload = [];
//         let file_key = Object.keys(files);
//         file_key.map((key) => {
//             let file_obj = files[key];
//             if (file_obj['type'].split('/')[0] == 'image') {
//                 filesToUpload.push(file_obj);
//             } else {
//                 isInvalidFile = true;
//             }
//         })

//         if (isInvalidFile) {
//             notification({ message: lang('ONLY_IMAGE_FILES_ALLOWED', 'Only image files are allowed.'), type: 'warning' });
//             return;
//         }
//         let executeAfterEveryAPICall = (obj = null) => {
//             notification({ message: lang('FILE_UPLOADED_SUCCESSFULLY', "File uploaded successfully."), type: 'success' });
//             // const range = this.quillRef.getSelection();
//             // this.quillRef.insertEmbed(range.index, 'image', obj.filePath);
//         }
//         this.uploadFile(files, 0, 0, executeAfterEveryAPICall);
//     }

//     uploadFile(files, index, remainingFiles, callback) {
//         let me = this;
//         let cropSize = "";
//         let formData = new FormData();
//         formData.append('directory_path', this.props.directoryPath);
//         formData.append('file_path', files[index], files[index].name);
//         formData.append('return_json', 1);
//         formData.append('file_original_name', files[index].name);
//         formData.append('createThumbnail', 1);
//         formData.append('customResolutions', 1);
//         let cropperFileSize = {
//             width: 44,
//             height: 44
//         }
//         cropSize = cropperFileSize.width + 'x' + cropperFileSize.height;
//         let reader = new FileReader();
//         reader.readAsDataURL(files[index]);
//         reader.onload = (event) => {
//             let img = new Image();
//             img.src = event.target.result;
//             img.onload = (e) => {
//                 if (e.target.width < e.target.height) {
//                     cropperFileSize = {
//                         height: 44,
//                         width: Math.floor(e.target.width * 44 / e.target.height)
//                     };
//                 } else {
//                     cropperFileSize = {
//                         width: 44,
//                         height: Math.floor(e.target.height * 44 / e.target.width)
//                     };
//                 }
//                 cropSize = cropperFileSize.width + 'x' + cropperFileSize.height;
//                 let resolutions = [{ ...cropperFileSize }];
//                 formData.append('resolutions', JSON.stringify(resolutions));
//                 let success = false;
//                 let result;
//                 let response;
//                 $.ajax({
//                     url: BASEURL + '/Common/mediaService/uploadMedia',
//                     // url: 'https://devendpoint.247software.com' + '/Common/MediaService/uploadMedia',
//                     method: "POST",
//                     dataType: 'json',
//                     data: formData,
//                     async:false,
//                     processData: false,
//                     contentType: false,
//                     crossDomain: true,
//                     success: (response) => {
//                         if (response.status_code == 200) {
//                             result = response.data;
//                             response = response;
//                             success = true;
//                         }
//                     },
//                     error: (response) => {
//                         if (response.status_code == 200) {
//                             result = response.data;
//                             response = response;
//                             success = true;
//                         }
//                     }
//                 });
//                 if (success) {
//                     let obj = {
//                         id: IDGenerator(),
//                         filePath: result.image.path,
//                     }
//                     callback(obj);
//                 } else {
//                     notification({ message: lang('UNABLE_TO_UPLOAD_IMAGE','Unable to upload image'), type: 'danger' });
//                 }

//             }
//         }
//     }

//     //----------------------------------------------------------------------
//     addNoteTemplate() {
//         let me = this;
//         let note_template_name = me.note_template_name;
//         let facilityDropDown = me.facilityDropDown;
//         me.noteTemplateAddEditFormValidator.validate($('#note-template-add-edit-form'));
       

//         //  console.log(this.noteTemplate_content);
//         //  console.log(this.noteTemplate_original_content);

//         if(this.note_template_name.val()==""){
//             this.note_template_name.focus();
//         }
//         else if(!this.facilityDropDown.validate()){
//             setTimeout(function(){
//                 this.facilityDropDown.focus();
//             }.bind(this),100)
//             me.isFormValid = false;
//         }
//         else{
//             let refs=this.refs.showModule.refs;

//             if(!(refs.notepad==undefined)){
//                if(refs.notepad._reactInternalFiber.key==0){
//                     if(refs.notepad.val()==false){
//                         refs.notepad.focus();
//                     }
//                 }
//             } 
//             if(!(refs.activity_log==undefined)){
//                if(refs.activity_log._reactInternalFiber.key==0){
//                     if(refs.activity_log.val()==false){
//                         refs.activity_log.focus();
//                     }
//                 }
//             } 
//             if(!(refs.cmms==undefined)){
//                 if(refs.cmms._reactInternalFiber.key==0){
//                     if(refs.cmms.val()==false){
//                         refs.cmms.focus();
//                     }
//                 }
//             } 
//             if(!(refs.ims==undefined)){
//                 if(refs.ims._reactInternalFiber.key==0){
//                     if(refs.ims.val()==false){
//                         refs.ims.focus();
//                     }
//                 }
//             }  
//             if(!(refs.request_tracker==undefined)){
//                 if(refs.request_tracker._reactInternalFiber.key==0){
//                     if(refs.request_tracker.val()==false){
//                         refs.request_tracker.focus();
//                     }
//                 }
//             }
//         }

//         if (me.isFormValid) {
//             if (note_template_name.val()) {
//                 $('.bottom-save-button')[0].disabled = true;
//                 $('.save-button')[0].disabled = true;
//                 let showModule = me.refs.showModule.refs;
//                 let facility_ids = [];
//                 let facility_data = facilityDropDown.getSelectedItems();
//                 facility_data.forEach(e => {
//                     if (e.facility_id != '-1') {
//                         facility_ids.push({ 'facility_id': e.facility_id });
//                     }
//                 });
//                 let data = {
//                     note_template_name: note_template_name.val().trim(),
//                     facility_ids: facility_ids,
//                     //content: me.noteTemplateContent.getText().trim(),
//                     content: me.noteTemplate_content,
//                     // original_content: JSON.stringify(me.noteTemplateContent.getContents()),
//                     original_content: JSON.stringify(me.noteTemplate_original_content),
//                     ims: showModule.ims ? showModule.ims.val() ? "1" : "0" : "0",
//                     activity_log: showModule.activity_log ? showModule.activity_log.val() ? "1" : "0" : "0",
//                     request_tracker: showModule.request_tracker ? showModule.request_tracker.val() ? "1" : "0" : "0",
//                     notepad: showModule.notepad ? showModule.notepad.val() ? "1" : "0" : "0",
//                     cmms: showModule.cmms ? showModule.cmms.val() ? "1" : "0" : "0",
//                 };

//                 if (data.ims == "0" && data.activity_log == "0" && data.request_tracker == "0" && data.notepad == "0" && data.cmms == "0") {
//                     notification({ message: lang("ATLEAST_ONE_MODULE_IS_SHOULD_BE_ENABLED", "Atleast one module should be enabled"), type: 'warning' });
//                     $('.bottom-save-button')[0].disabled = false;
//                     $('.save-button')[0].disabled = false;
//                     return;
//                 }

//                 if (me.fromPage == "edit_page") {
//                     data.id = this.props.match.params.id;
//                     $.ajax({
//                         // url: 'http://localhost:8000/Customer/Setup/Common/NoteTemplate/update',
//                         url: BASEURL + '/noteTemplate/update',
//                         type: "PUT",
//                         data: { data: JSON.stringify(data) },
//                         success: function (result) {
//                             if (result.status_code == 200) {
//                                 notification({ message: result.message, type: 'success' });
//                                 $('#saveButton').attr('disabled', true);
//                                 $('.save-button')[0].disabled = true;
//                                 me.cancelNoteTemplate();
//                             }
//                             else {
//                                 if (result.status_code == 412) {
//                                     notification({ message: result.error_message, type: 'danger' });
//                                     $('.bottom-save-button')[0].disabled = false;
//                                     $('.save-button')[0].disabled = false;
//                                 } else {
//                                     notification({ message: result.message, type: 'warning' });
//                                     $('.bottom-save-button')[0].disabled = false;
//                                     $('.save-button')[0].disabled = false;
//                                 }
//                             }
//                         }
//                     });
//                 } else {
//                     $.ajax({
//                         // url: 'http://localhost:8000/Customer/Setup/Common/NoteTemplate/insert',
//                         url: BASEURL + '/noteTemplate/insert',
//                         type: "POST",
//                         data: {
//                             data: JSON.stringify(data),
//                         },
//                         success: function (result) {
//                             if (result.status_code == 409) {
//                                 $('.note-template-name').focus();
//                                 $('.bottom-save-button')[0].disabled = false;
//                                 $('.save-button')[0].disabled = false;
//                                 notification({ message: result.message, type: 'warning' });
//                             }
//                             else
//                                 if (result.status_code == 201) {
//                                     notification({ message: result.message, type: 'success' });
//                                     me.cancelNoteTemplate();
//                                 }
//                                 else if (result.status_code == 403) {
//                                     notification({ message: result.message, type: 'danger' });
//                                     me.cancelNoteTemplate();
//                                 }
//                                 else if (result.status_code == 412) {
//                                     notification({ message: result.error_message, type: 'danger' });
//                                     $('.bottom-save-button')[0].disabled = false;
//                                     $('.save-button')[0].disabled = false;
//                                 }
//                         }
//                     });
//                 }
//             }
//         }
//     }
//     cancelNoteTemplate() {
//         this.props.changeBreadCrumData({});
//         this.props.history.push({
//             pathname: '/setup-navigation/note-templates',
//         });
//     }
//     render() {
//         let me = this;

//         me.props.userData.setup_module_permission['note-templates'].forEach(element => {
//             if (!me.allModules.includes(element)) {
//                 me.allModules.push(element);
//             }
//         });

//         let rules = [
//             { input: '.note-template-name', message: lang("NOTE_TEMPLATE_REQUIRED", "Note Template name is required"), action: 'keyup', rule: 'required' },
//             { input: '.note-template-name', message: lang("MAX_LENGTH_250", "Maximum 250 characters are allowed"), action: 'keyup', rule: 'length=1,250' }
//         ];

//         //-------------------------Made changes---------------------------------------------
//         /*
//         *  Added for @ feature i.e., for mentioning someone
//         */
//             var fakeServer = (function () {
//                 /* Use tinymce's Promise shim */
//                 //var Promise = window.tinymce.util.Promise;
            
//                 /* Some user names for our fake server */
//             var userNames = [
//                 'Terry Green', 'Edward Carroll', 'Virginia Turner', 'Alexander Schneider', 'Gary Vasquez', 'Randy Howell',
//                 'Katherine Moore', 'Betty Washington', 'Grace Chapman', 'Christina Nguyen', 'Danielle Rose', 'Thomas Freeman',
//                 'Thomas Armstrong', 'Vincent Lee', 'Brittany Kelley', 'Brenda Wheeler', 'Amy Price', 'Hannah Harvey',
//                 'Bobby Howard', 'Frank Fox', 'Diane Hopkins', 'Johnny Hawkins', 'Sean Alexander', 'Emma Roberts', 'Thomas Snyder',
//                 'Thomas Allen', 'Rebecca Ross', 'Amy Boyd', 'Kenneth Watkins', 'Sarah Tucker', 'Lawrence Burke', 'Emma Carr',
//                 'Zachary Mason', 'John Scott', 'Michelle Davis', 'Nicholas Cole', 'Gerald Nelson', 'Emily Smith', 'Christian Stephens',
//                 'Grace Carr', 'Arthur Watkins', 'Frances Baker', 'Katherine Cook', 'Roger Wallace', 'Pamela Arnold', 'Linda Barnes',
//                 'Jacob Warren', 'Billy Ramirez', 'Pamela Walsh', 'Paul Wade', 'Katherine Campbell', 'Jeffrey Berry', 'Patrick Bowman',
//                 'Dennis Alvarez', 'Crystal Lucas', 'Howard Mendoza', 'Patricia Wallace', 'Peter Stone', 'Tiffany Lane', 'Joe Perkins',
//                 'Gloria Reynolds', 'Willie Fernandez', 'Doris Harper', 'Heather Sandoval', 'Danielle Franklin', 'Ann Ellis',
//                 'Christopher Hernandez', 'Pamela Perry', 'Matthew Henderson', 'Jesse Mitchell', 'Olivia Reed', 'David Clark', 'Juan Taylor',
//                 'Michael Garrett', 'Gerald Guerrero', 'Jerry Coleman', 'Joyce Vasquez', 'Jane Bryant', 'Sean West', 'Deborah Bradley',
//                 'Phillip Castillo', 'Martha Coleman', 'Ryan Santos', 'Harold Hanson', 'Frances Hoffman', 'Heather Fisher', 'Martha Martin',
//                 'George Gray', 'Rachel Herrera', 'Billy Hart', 'Kelly Campbell', 'Kelly Marshall', 'Doris Simmons', 'Julie George',
//                 'Raymond Burke', 'Ruth Hart', 'Jack Schmidt', 'Billy Schmidt', 'Ruth Wagner', 'Zachary Estrada', 'Olivia Griffin', 'Ann Hayes',
//                 'Julia Weaver', 'Anna Nelson', 'Willie Anderson', 'Anna Schneider', 'Debra Torres', 'Jordan Holmes', 'Thomas Dean',
//                 'Maria Burton', 'Terry Long', 'Danielle McDonald', 'Kyle Flores', 'Cheryl Garcia', 'Judy Delgado', 'Karen Elliott',
//                 'Vincent Ortiz', 'Ann Wright', 'Ann Ramos', 'Roy Jensen', 'Keith Cunningham', 'Mary Campbell', 'Jesse Ortiz', 'Joseph Mendoza',
//                 'Nathan Bishop', 'Lori Valdez', 'Tammy Jacobs', 'Mary West', 'Juan Mitchell', 'Thomas Adams', 'Christian Martinez', 'James Ramos',
//                 'Deborah Ross', 'Eric Holmes', 'Thomas Diaz', 'Sharon Morales', 'Kathryn Hamilton', 'Helen Edwards', 'Betty Powell',
//                 'Harry Campbell', 'Raymond Perkins', 'Melissa Wallace', 'Danielle Hicks', 'Harold Brewer', 'Jack Burns', 'Anna Robinson',
//                 'Dorothy Nguyen', 'Jane Dean', 'Janice Hunter', 'Ryan Moore', 'Brian Riley', 'Brittany Bradley', 'Phillip Ortega', 'William Fisher',
//                 'Jennifer Schultz', 'Samantha Perez', 'Linda Carr', 'Ann Brown', 'Shirley Kim', 'Jeremy Alvarez', 'Dylan Oliver', 'Roy Gomez',
//                 'Ethan Brewer', 'Ruth Lucas', 'Marilyn Myers', 'Danielle Wright', 'Jose Meyer', 'Bobby Brown', 'Angela Crawford', 'Brandon Willis',
//                 'Kyle McDonald', 'Aaron Valdez', 'Kevin Webb', 'Ashley Gordon', 'Karen Jenkins', 'Johnny Santos', 'Ashley Henderson', 'Amy Walters',
//                 'Amber Rodriguez', 'Thomas Ross', 'Dorothy Wells', 'Jennifer Murphy', 'Douglas Phillips', 'Helen Johnston', 'Nathan Hawkins',
//                 'Roger Mitchell', 'Michael Young', 'Eugene Cruz', 'Kevin Snyder', 'Frank Ryan', 'Tiffany Peters', 'Beverly Garza', 'Maria Wright',
//                 'Shirley Jensen', 'Carolyn Munoz', 'Kathleen Day', 'Ethan Meyer', 'Rachel Fields', 'Joan Bell', 'Ashley Sims', 'Sara Fields',
//                 'Elizabeth Willis', 'Ralph Torres', 'Charles Lopez', 'Aaron Green', 'Arthur Hanson', 'Betty Snyder', 'Jose Romero', 'Linda Martinez',
//                 'Zachary Tran', 'Sean Matthews', 'Eric Elliott', 'Kimberly Welch', 'Jason Bennett', 'Nicole Patel', 'Emily Guzman', 'Lori Snyder',
//                 'Sandra White', 'Christina Lawson', 'Jacob Campbell', 'Ruth Foster', 'Mark McDonald', 'Carol Williams', 'Alice Washington',
//                 'Brandon Ross', 'Judy Burns', 'Zachary Hawkins', 'Julie Chavez', 'Randy Duncan', 'Lisa Robinson', 'Jacqueline Reynolds', 'Paul Weaver',
//                 'Edward Gilbert', 'Deborah Butler', 'Frances Fox', 'Joshua Schmidt', 'Ashley Oliver', 'Martha Chavez', 'Heather Hudson',
//                 'Lauren Collins', 'Catherine Marshall', 'Katherine Wells', 'Robert Munoz', 'Pamela Nelson', 'Dylan Bowman', 'Virginia Snyder',
//                 'Janet Ruiz', 'Ralph Burton', 'Jose Bryant', 'Russell Medina', 'Brittany Snyder', 'Richard Cruz', 'Matthew Jimenez', 'Danielle Graham',
//                 'Steven Guerrero', 'Benjamin Matthews', 'Janet Mendoza', 'Harry Brewer', 'Scott Cooper', 'Alexander Keller', 'Virginia Gordon',
//                 'Randy Scott', 'Kimberly Olson', 'Helen Lynch', 'Ronald Garcia', 'Joseph Willis', 'Philip Walker', 'Tiffany Harris', 'Brittany Weber',
//                 'Gregory Harris', 'Sean Owens', 'Wayne Meyer', 'Roy McCoy', 'Keith Lucas', 'Christian Watkins', 'Christopher Porter', 'Sandra Lopez',
//                 'Harry Ward', 'Julie Sims', 'Albert Keller', 'Lori Ortiz', 'Virginia Henry', 'Samuel Green', 'Judith Cole', 'Ethan Castillo', 'Angela Ellis',
//                 'Amy Reid', 'Jason Brewer', 'Aaron Clark', 'Aaron Elliott', 'Doris Herrera', 'Howard Castro', 'Kenneth Davis', 'Austin Spencer',
//                 'Jonathan Marshall', 'Phillip Nelson', 'Julia Guzman', 'Robert Hansen', 'Kevin Anderson', 'Gerald Arnold', 'Austin Castro', 'Zachary Moore',
//                 'Joseph Cooper', 'Barbara Black', 'Albert Mendez', 'Marie Lane', 'Jacob Nichols', 'Virginia Marshall', 'Aaron Miller', 'Linda Harvey',
//                 'Christopher Morris', 'Emma Fields', 'Scott Guzman', 'Olivia Alexander', 'Kelly Garrett', 'Jesse Hanson', 'Henry Wong', 'Billy Vasquez',
//                 'Larry Ramirez', 'Bryan Brooks', 'Alan Berry', 'Nicole Powell', 'Stephen Bowman', 'Eric Hughes', 'Elizabeth Obrien', 'Timothy Ramos',
//                 'Michelle Russell', 'Denise Ruiz', 'Sean Carter', 'Amanda Barnett', 'Kathy Black', 'Terry Gutierrez', 'John Jensen', 'Grace Sanchez',
//                 'Tiffany Harvey', 'Jacqueline Sims', 'Wayne Lee', 'Roy Foster', 'Joyce Hart', 'Joseph Russell', 'Harold Washington', 'Beverly Cox',
//                 'Nicole Morales', 'Anna Carpenter', 'Jesse Ray', 'Ann Snyder', 'Mark Diaz', 'Elizabeth Harper', 'Andrew Guerrero', 'Cheryl Silva',
//                 'Michelle Hudson', 'Jeffrey Santos', 'Victoria Vasquez', 'Matthew Meyer', 'Jacob Murray', 'Jose Munoz', 'Edward Howell', 'Vincent Hunter',
//                 'Daniel Walters', 'Samantha Obrien', 'Laura Elliott', 'Richard Olson', 'Daniel Graham', 'Carol Lee', 'Grace Sullivan', 'Nancy Rodriguez',
//                 'Tyler Tran', 'Crystal Shaw', 'Madison Allen', 'Ralph Sims', 'Joe Jenkins', 'Dennis Ray', 'Arthur Davidson', 'Victoria Allen', 'Arthur Jackson',
//                 'Joan Thomas', 'Daniel Hopkins', 'Gloria Hicks', 'Danielle Price', 'Craig Keller', 'Alan Morgan', 'Gregory Silva', 'Samantha Kelly',
//                 'Rachel Williamson', 'Bruce Garrett', 'Jacob Smith', 'Kathleen Nichols', 'Sarah Long', 'Carol Pearson', 'Virginia Mendez', 'Judy Valdez',
//                 'Jason Garza', 'Brenda Fowler', 'Karen Edwards', 'Alexander Anderson', 'Pamela Wallace', 'Ruth Howell', 'Walter Hernandez', 'George Lucas',
//                 'Samantha Long', 'Margaret Garza', 'Kathleen Schultz', 'Frances Guerrero', 'Amber Meyer', 'Rachel Morales', 'Teresa Curtis', 'Heather Bell',
//                 'Grace Johnson', 'Melissa King', 'Zachary Cook', 'Carol Schultz', 'Jane Beck', 'Karen Stone', 'Roger Brooks', 'Carolyn Fuller', 'Nicholas Coleman',
//                 'William Bishop', 'Christine May', 'Linda George', 'Jean Meyer', 'Cheryl Armstrong', 'Danielle Welch', 'Amanda Graham', 'Janice Carter',
//                 'Catherine Brooks', 'Lawrence Gonzalez', 'Amy Russell', 'Eugene Jimenez', 'Joseph Carlson', 'Peter McCoy', 'Jerry Washington', 'Carolyn Obrien',
//                 'Mark Walker', 'Stephanie Hoffman', 'Julie Pena', 'Karen Curtis', 'Bryan Cruz', 'Madison Shaw', 'Rachel Graham', 'Susan Simpson', 'Andrea Harrison',
//                 'Bryan Miller', 'Vincent McDonald', 'Jesse McCoy', 'Christine Ramos', 'Dorothy Riley', 'Karen Warren', 'Ashley Weber', 'Judith Robinson',
//                 'Alan Mendez', 'Donna Medina', 'Helen Lane', 'Douglas Clark', 'Brenda Romero', 'Doris Wells', 'Patrick Howell', 'Doris Lawrence', 'Harry Jacobs',
//                 'Phillip Rose', 'Deborah Patel', 'Bryan Day', 'Rachel Butler', 'Paul Butler', 'Judy Knight', 'Willie Wallace', 'Phillip Anderson', 'Emma Black',
//                 'Lisa Lynch', 'Kimberly Freeman', 'Ronald West', 'Kathleen Harris', 'Martha Ruiz', 'Phillip Moreno', 'Robert Vargas', 'Jesse Diaz', 'Christine Weber',
//                 'Karen Stanley', 'Theresa Edwards', 'Kathryn Chavez', 'Sarah Rios', 'Danielle Wong', 'Kathy Carr', 'Joan Diaz', 'Albert Walters',
//                 'Denise Kim', 'Katherine Pearson', 'Diana Richardson', 'Harry Ford', 'Eric Mills', 'Sean Hicks', 'Joe Brown', 'Judith Morgan', 'Harry Hunter',
//                 'Matthew Bryant', 'Tyler Rose', 'Mildred Delgado', 'Emma Peters', 'Walter Delgado', 'Lauren Gilbert', 'Christopher Romero'
//             ];
            
//             /* some user profile images for our fake server */
//             var images = [
//                 'camilarocun', 'brianmichel', 'absolutehype', '4l3d', 'lynseybrowne', 'hi_kendall', '4ae78e7058d2434', 'yusuf_y7',
//                 'beauty__tattoos', 'mehrank36176270', 'fabriziocuscini', 'hassaminian', 'mediajorge', 'alexbienz', 'eesates', 'donjain',
//                 'austinknight', 'ehlersd', 'bipiiin', 'victorstuber', 'curiousoffice', 'chowdhury_sayan', 'upslon', 'gcauchon', 'pawel_murawski',
//                 'mr_r_a', 'jeremieges', 'nickttng', 'patrikward', 'sinecdoques', 'gabrielbeduschi', 'ashmigosh', 'shxnx', 'laborisova',
//                 'anand_2688', 'mefahad', 'puneetsmail', 'jefrydagucci', 'duck4fuck', 'verbaux', 'nicolasjengler', 'sorousht_', 'am0rz',
//                 'dominiklevitsky', 'jarjan', 'ganilaughs', 'namphong122', 'tiggreen', 'allisongrayce', 'messagepadapp', 'madebylipsum',
//                 'tweetubhai', 'avonelink', 'ahmedkojito', 'piripipirics', 'dmackerman', 'markcipolla'
//             ];
            
//             /* some user profile descriptions for our fake server */
//             var descriptions = [
//                 'I like to work hard, play hard!',
//                 'I drink like a fish, that is a fish that drinks coffee.',
//                 'OutOfCheeseError: Please reinstall universe.',
//                 'Do not quote me.',
//                 'No one reads these things right?'
//             ];
            
//             /* This represents a database of users on the server */
//             var userDb = {};
//             userNames.map(function (fullName) {
//                 var name = fullName.toLowerCase().replace(/ /g, '');
//                 var description = descriptions[Math.floor(descriptions.length * Math.random())];
//                 var image = 'https://s3.amazonaws.com/uifaces/faces/twitter/' + images[Math.floor(images.length * Math.random())] + '/128.jpg';
//                 return {
//                     id: name,
//                     name: name,
//                     fullName: fullName,
//                     description: description,
//                     image: image
//                 };
//                 }).forEach(function(user) {
//                 userDb[user.id] = user;
//             });
            
//             /* This represents getting the complete list of users from the server with only basic details */
//             var fetchUsers = function() {
//                 return new Promise(function(resolve, _reject) {
//                     /* simulate a server delay */
//                     setTimeout(function() {
//                     var users = Object.keys(userDb).map(function(id) {
//                         return {
//                         id: id,
//                         name: userDb[id].name,
//                         };
//                     });
//                     resolve(users);
//                     }, 500);
//                 });
//                 };
            
//                 /* This represents requesting all the details of a single user from the server database */
//                 var fetchUser = function(id) {
//                 return new Promise(function(resolve, reject) {
//                     /* simulate a server delay */
//                     setTimeout(function() {
//                     if (Object.prototype.hasOwnProperty.call(userDb, id)) {
//                         resolve(userDb[id]);
//                     }
//                     reject('unknown user id "' + id + '"');
//                     }, 300);
//                 });
//                 };
            
//                 return {
//                 fetchUsers: fetchUsers,
//                 fetchUser: fetchUser
//                 };
//             })();
            
//                 /* These are "local" caches of the data returned from the fake server */
//                 var usersRequest = null;
//                 var userRequest = {};
            
//                 var mentions_fetch = function (query, success) {
//                 /* Fetch your full user list from somewhere */
//                 if (usersRequest === null) {
//                     usersRequest = fakeServer.fetchUsers();
//                 }
//                 usersRequest.then(function(users) {
//                     /* query.term is the text the user typed after the '@' */
//                     users = users.filter(function (user) {
//                     return user.name.indexOf(query.term.toLowerCase()) !== -1;
//                     });
            
//                     users = users.slice(0, 10);
                    
//                     /* Where the user object must contain the properties `id` and `name`
//                     but you could additionally include anything else you deem useful. */
//                     success(users);
//                 });
//                 };
            
//                 var mentions_menu_hover = function (userInfo, success) {
//                 /* request more information about the user from the server and cache it locally */
//                 if (!userRequest[userInfo.id]) {
//                     userRequest[userInfo.id] = fakeServer.fetchUser(userInfo.id);
//                 }
//                 userRequest[userInfo.id].then(function(userDetail) {
//                     var div = document.createElement('div');
            
//                     div.innerHTML = (
//                     '<div class="card">' +
//                         '<h1>' + userDetail.fullName + '</h1>' +
//                         '<img class="avatar" src="' + userDetail.image + '"/>' +
//                         '<p>' + userDetail.description + '</p>' +
//                     '</div>'
//                     );
            
//                     success(div);
//                     });
//                 };
            
//                 var mentions_menu_complete = function (editor, userInfo) {
//                     var span = editor.getDoc().createElement('span');
//                     span.className = 'mymention';
//                     span.setAttribute('data-mention-id', userInfo.id);
//                     span.appendChild(editor.getDoc().createTextNode('@' + userInfo.name));
//                     return span;
//                 };
            
//                 var mentions_select = function (mention, success) {
//                     /* `mention` is the element we previously created with `mentions_menu_complete`
//                     in this case we have chosen to store the id as an attribute */
//                     var id = mention.getAttribute('data-mention-id');
//                     /* request more information about the user from the server and cache it locally */
//                     if (!userRequest[id]) {
//                     userRequest[id] = fakeServer.fetchUser(id);
//                     }
//                     userRequest[id].then(function(userDetail) {
//                     var div = document.createElement('div');
//                     div.innerHTML = (
//                         '<div class="card">' +
//                         '<h1>' + userDetail.fullName + '</h1>' +
//                         '<img class="avatar" src="' + userDetail.image + '"/>' +
//                         '<p>' + userDetail.description + '</p>' +
//                         '</div>'
//                     );
//                     success(div);
//                     });
//                 };
        

//         //----------------------------------------------------------------------------------
//         return (
//             <div className="card form-div template-div-div">
//                 <div id="note-template-add-edit">
//                     <JqxValidator ref={(JqxValidator) => { this.noteTemplateAddEditFormValidator = JqxValidator }} rules={rules} hintType={'label'} >
//                         <form id="note-template-add-edit-form">
//                             <h4 className="main-title" style={{ width: '100%'}} >{this.props.match.params.id ? lang("EDIT_NOTE_TEMPLATE", "Edit Note Template") : lang("ADD_NOTE_TEMPLATE", "Add Note Template")}</h4>
//                             <hr />
//                             <div className="row margin-0">
//                                 <div className="col-md-12 padding-0">
//                                     <div className="row">
//                                         <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
//                                             <label className="template-add-edit-label">{lang("TEMPLATE_NAME", "Template Name")}<sup className="label-required">*</sup></label>
//                                             <JqxInput width="100%" name="note-template-name" ref={(JqxInput) => { this.note_template_name = JqxInput; }} className="note-template-name" />
//                                         </div>
//                                     </div>
//                                     {
//                                         (this.singleFacility) ? 
//                                             <div style={{display:'none'}} className="row note-template-facility-dropdown">
//                                                 <div className="col-lg-6 col-md-9 col-sm-12 pt-3">
//                                                     <label className="template-add-edit-label">{lang("FACILITY", "Facility")}</label><sup className="label-required">*</sup>
//                                                     <MultiSelectNestedCombobox
//                                                         ref={(JqxDropDownList) => { this.facilityDropDown = JqxDropDownList; }}
//                                                         className={'note-template-facility'}
//                                                         height={150}
//                                                         width={"100%"}
//                                                         placeholder={lang("SELECT", "Select")}
//                                                         multiSelect={true}
//                                                         nested={false}
//                                                         idField={'facility_id'}
//                                                         displayField={'facility_name'}
//                                                         onItemClick={this.facilityChanged}
//                                                         onItemDeselect={this.facilityChanged}
//                                                         validations={{
//                                                             trigger: ['change'],
//                                                             message: lang("FACILITY", "Facility") + ' ' + lang("IS_REQUIRED"),
//                                                             type: "label",
//                                                             rules: "mandatory"
//                                                         }}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         :
//                                             <div className="row note-template-facility-dropdown">
//                                                 <div className="col-lg-6 col-md-9 col-sm-12 pt-3">
//                                                     <label className="template-add-edit-label">{lang("FACILITY", "Facility")}</label><sup className="label-required">*</sup>
//                                                     <MultiSelectNestedCombobox
//                                                         ref={(JqxDropDownList) => { this.facilityDropDown = JqxDropDownList; }}
//                                                         className={'note-template-facility'}
//                                                         height={150}
//                                                         width={"100%"}
//                                                         placeholder={lang("SELECT", "Select")}
//                                                         multiSelect={true}
//                                                         nested={false}
//                                                         idField={'facility_id'}
//                                                         displayField={'facility_name'}
//                                                         onItemClick={this.facilityChanged}
//                                                         onItemDeselect={this.facilityChanged}
//                                                         validations={{
//                                                             trigger: ['change'],
//                                                             message: lang("FACILITY", "Facility") + ' ' + lang("IS_REQUIRED"),
//                                                             type: "label",
//                                                             rules: "mandatory"
//                                                         }}
//                                                     />
//                                                 </div>
//                                             </div>
//                                     }
//                                     <div className="row">
//                                         <div style={{ height: '246px', paddingBottom: '20px', paddingTop:'15px' }} className="col-lg-12">
//                                             <div className="editor-bound">
//                                                 <label className="template-add-edit-label">
//                                                     {lang("CONTENT", "Content")}
//                                                 </label>
                                                
//                                                 {/* Temporary change - Adding textbox.io */}
                                                
//                                                 <Editor 
//                                                         apiKey='lafm77u0226etr9zqzv9hr95sdh6p5zrwgtzdmzk4rwb3m56'
//                                                         ref= {(Editor) => { this.noteTemplateContent = Editor; }}
//                                                         className='note-template-content'
//                                                         id = 'editor-template-content'
//                                                         bounds={'.editor-bound'}
//                                                         //directoryPath={`Customer/${me.props.userData.account_id}/Setup/NoteTemplate`}
//                                                         initialValue = {this.noteTemplate_original_content}
//                                                         init={{
//                                                             plugins: ['link image code preview print paste searchreplace visualblocks fullscreen',
//                                                                     'media table anchor insertdatetime charmap wordcount advlist mentions'
//                                                             ],
//                                                             toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
//                                                             //plugins: "powerpaste"
                                                            
//                                                             content_style: ".mymention{ color: green; }",

//                                                             mentions_selector: '.mymention',
//                                                             mentions_fetch: mentions_fetch,
//                                                             mentions_menu_hover: mentions_menu_hover,
//                                                             mentions_menu_complete: mentions_menu_complete,
//                                                             mentions_select: mentions_select,
                                                           
//                                                             /* enable title field in the Image dialog*/
//                                                             image_title: true,
//                                                             image_dimensions: false,
//                                                             /* enable automatic uploads of images represented by blob or data URIs*/
//                                                             automatic_uploads: true,
                                                            
//                                                             file_browser_callback_types: 'image',
//                                                             file_picker_callback: function (callback, value, meta) {
//                                                                 if (meta.filetype === 'image') {
//                                                                     var input = document.getElementById('my-file');
//                                                                     input.click();
//                                                                     input.onchange = function () {
//                                                                         var file = input.files[0];
//                                                                         var reader = new FileReader();
//                                                                         reader.onload = function (e) {
//                                                                             //console.log('name',e.target.result);
//                                                                             callback(e.target.result, {
//                                                                                 alt: file.name
//                                                                             });
//                                                                         };
//                                                                         reader.readAsDataURL(file);
//                                                                     };
//                                                                 }
//                                                             },
//                                                             paste_data_images: true,
//                                                         }}
//                                                         onChange={this.handleEditorChange}
//                                                         />

//                                                         <input id="my-file" type="file" name="my-file" style={{display:"none"}} onChange={(event) => { this.onFileChange(event.target.files) }}/>
//                                                 {/* <Editor
//                                                     style={{ height: '176px' }}
//                                                     ref={(Editor) => { this.noteTemplateContent = Editor; }}
//                                                     className='note-template-content'
//                                                     bounds={'.editor-bound'}
//                                                     directoryPath={`Customer/${me.props.userData.account_id}/Setup/NoteTemplate`}
//                                                 /> */}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-12 col-md-12 col-sm-12" style={{ padding: "10px 0px 0px 0px" }}>
//                                 <ShowOnModules
//                                     ref='showModule'
//                                     modules={(this.fromPage == 'edit_note_template') ? this.afterCheckChange(this.recordId) : this.defaultModules(this.allModules)}
//                                     fromNoteTemplate={true}
//                                 />
//                             </div>
//                             <hr style={{ margin: '20px 0px 0px 0px' }}/>
//                             <div id='bottom-cancel-save' className="bottom-cancel-save-button col-lg-12 col-12">
//                                 <div className="button-div">
//                                     <button onClick={() => this.cancelNoteTemplate()} className="top-child-cancel-button cancel-button" type="button">{lang("CANCEL", "Cancel")}</button>
//                                 </div>
//                                 <div className="button-div">
//                                     <button onClick={() => this.addNoteTemplate()} className="bottom-save-button save-button" type="button">{lang("SAVE", "Save")}</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </JqxValidator>
//                 </div>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return { userData: state.userData }
// }
// function mapDispatchToprops (dispatch) {
//     return({
//         changeBreadCrumData: (payload) => dispatch({type: 'BREADCRUMLINK' ,data:payload})
//     })
// }
// export default connect(mapStateToProps, mapDispatchToprops)(NoteTemplateAddEdit) 