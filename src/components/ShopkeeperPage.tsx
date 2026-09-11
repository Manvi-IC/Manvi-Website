"use client";

import { useEffect } from "react";
import Image from "next/image";

const zohoFormHtml = `
<div id='crmWebToEntityForm' class='zcwf_lblLeft crmWebToEntityForm' style='background-color: white;color: black;max-width: 600px;'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <META HTTP-EQUIV='content-type' CONTENT='text/html;charset=UTF-8'>
  <form id='webform1394241000000604320' action='https://crm.zoho.in/crm/WebToLeadForm' name='WebToLeads1394241000000604320' method='POST' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory1394241000000604320()' accept-charset='UTF-8'>
    <input type='text' style='display:none;' name='xnQsjsdp' value='5d36fe4ccf2211a95a323ac159955263068b8121667a6497bffb393b6173e11b'>
    <input type='hidden' name='zc_gad' id='zc_gad' value=''>
    <input type='text' style='display:none;' name='xmIwtLD' value='f02ff563ef0a153f6056f8c0fa24d1af0d4ee55f0c9366b73786d5d47923b9417d30878160ae6a4ce3a766b78f2f5d78'>
    <input type='text' style='display:none;' name='actionType' value='TGVhZHM='>
    <input type='text' style='display:none;' name='returnURL' value='null'>
    <style>
      html,body{margin:0px;} .formsubmit.zcwf_button{color:white !important;background:transparent linear-gradient(0deg, #0279FF 0%, #00A3F3 100%);} #crmWebToEntityForm.zcwf_lblLeft{width:100%;padding:25px;margin:0 auto;box-sizing:border-box;} #crmWebToEntityForm.zcwf_lblLeft *{box-sizing:border-box;} #crmWebToEntityForm{text-align:left;} #crmWebToEntityForm *{direction:ltr;} .zcwf_lblLeft .zcwf_title{word-wrap:break-word;padding:0px 6px 10px;font-weight:bold} .zcwf_lblLeft.cpT_primaryBtn:hover{background:linear-gradient(#02acff 0,#006be4 100%)no-repeat padding-box !important;box-shadow:0 -2px 0 0 #0159b9 inset !important;border:0 !important;color:#fff !important;outline:0 !important;} .zcwf_lblLeft .zcwf_col_fld input[ type = text], input[ type = password], .zcwf_lblLeft .zcwf_col_fld textarea{width:60%;border:1px solid #c0c6cc !important;resize:vertical;border-radius:2px;float:left;} .zcwf_lblLeft .zcwf_col_lab{width:30%;word-break:break-word;padding:0px 6px 0px;margin-right:10px;margin-top:5px;float:left;min-height:1px;} .zcwf_lblLeft .zcwf_col_fld{float:left;width:68%;padding:0px 6px 0px;position:relative;margin-top:5px;} .zcwf_lblLeft .zcwf_privacy{padding:6px;} .zcwf_lblLeft .wfrm_fld_dpNn{display:none;} .dIB{display:inline-block;} .zcwf_lblLeft .zcwf_col_fld_slt{width:60%;border:1px solid #ccc;background:#fff;border-radius:4px;font-size:12px;float:left;resize:vertical;padding:2px 5px;} .zcwf_lblLeft .zcwf_row:after, .zcwf_lblLeft .zcwf_col_fld:after{content:'';display:table;clear:both;} .zcwf_lblLeft .zcwf_col_help{float:left;margin-left:7px;font-size:12px;max-width:35%;word-break:break-word;} .zcwf_lblLeft .zcwf_help_icon{cursor:pointer;width:16px;height:16px;display:inline-block;background:#fff;border:1px solid #c0c6cc;color:#c1c1c1;text-align:center;font-size:11px;line-height:16px;font-weight:bold;border-radius:50%;} .zcwf_lblLeft .zcwf_row{margin:15px 0px;} .zcwf_lblLeft .formsubmit{margin-right:5px;cursor:pointer;color:#313949;font-size:12px;} .zcwf_lblLeft .zcwf_privacy_txt{width:90%;color:rgb(0, 0, 0);font-size:12px;font-family:Arial;display:inline-block;vertical-align:top;color:#313949;padding-top:2px;margin-left:6px;} .zcwf_lblLeft .zcwf_button{font-size:12px;color:#313949;border:1px solid #c0c6cc;padding:3px 9px;border-radius:4px;cursor:pointer;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;} .zcwf_lblLeft .zcwf_tooltip_over{position:relative;} .zcwf_lblLeft .zcwf_tooltip_ctn{position:absolute;background:#dedede;padding:3px 6px;top:3px;border-radius:4px;word-break:break-word;min-width:100px;max-width:150px;color:#313949;z-index:100;} .zcwf_lblLeft .zcwf_ckbox{float:left;} .zcwf_lblLeft .zcwf_file{width:55%;box-sizing:border-box;float:left;} .cBoth:after{content:'';display:block;clear:both;} @media all and (max-width: 600px){ .zcwf_lblLeft .zcwf_col_lab, .zcwf_lblLeft .zcwf_col_fld{width:auto;float:none !important;} .zcwf_lblLeft .zcwf_col_help{width:40%;} }
    </style>
    <div class='zcwf_title' style='max-width: 600px;color: black; font-family:Arial;'>WhatsApp Redirect Form</div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab' style='font-size:12px; font-family: Arial;'><label for='First_Name'>First Name</label></div>
      <div class='zcwf_col_fld'><input type='text' id='First_Name' aria-required='false' aria-label='First Name' name='First Name' aria-valuemax='40' maxlength='40'><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab' style='font-size:12px; font-family: Arial;'><label for='Last_Name'>Last Name <span style='color:red;'>*</span></label></div>
      <div class='zcwf_col_fld'><input type='text' id='Last_Name' aria-required='true' aria-label='Last Name' name='Last Name' aria-valuemax='80' maxlength='80'><div class='zcwf_col_help'></div></div>
    </div>
    <div class='zcwf_row'>
      <div class='zcwf_col_lab' style='font-size:12px; font-family: Arial;'><label for='Mobile'>Mobile</label></div>
      <div class='zcwf_col_fld'><input type='text' id='Mobile' aria-required='false' aria-label='Mobile' name='Mobile' aria-valuemax='30' maxlength='30'><div class='zcwf_col_help'></div></div>
    </div>
    <input type='text' type='hidden' style='display: none;' name='aG9uZXlwb3Q' value='' />
    <div class='zcwf_row'>
      <div class='zcwf_col_lab'></div>
      <div class='zcwf_col_fld'><input type='submit' id='formsubmit' role='button' class='formsubmit zcwf_button' value='Submit' aria-label='Submit' title='Submit'><input type='reset' class='zcwf_button' role='button' name='reset' value='Reset' aria-label='Reset' title='Reset'></div>
    </div>
    <script>
      function checkMandatory1394241000000604320(isAjax){
        var mndFileds = new Array('Last Name');
        var fldLangVal = new Array('Last Name');
        for (i = 0; i < mndFileds.length; i++ ) {
          var fieldObj = document.forms['WebToLeads1394241000000604320'] [mndFileds[i]];
          if (fieldObj) {
            if(((fieldObj.value) .replace (/^\s+|\s+$/g,'') ) .length == 0) {
              if (fieldObj.type == 'file') {
                alert('Please select a file to upload.');
                fieldObj.focus();
                return false;
              }
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            } else if (fieldObj.nodeName == 'SELECT') {
              if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                alert(fldLangVal[i] + ' cannot be none.');
                fieldObj.focus();
                return false;
              }
            } else if (fieldObj.type == 'checkbox') {
              if (fieldObj.checked == false) {
                alert('Please accept ' + fldLangVal[i]);
                fieldObj.focus();
                return false;
              }
            }
            try{
              if (fieldObj.name == 'Last Name') { name = fieldObj.value; }
            } catch (e){}
          }
        }
        var urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has ('service') && (urlparams.get ('service') === 'smarturl') ) {
          var webform = document.getElementById('webform1394241000000604320');
          var service = urlparams.get('service');
          var smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service);
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
      }
      _wFa_ajax_will_be_replaced = false;
      if (typeof _wfa_fstprtcken == 'undefined') {
        _wfa_fstprtcken = {};
      }
      _wfa_fstprtcken[1394241000000604320] = true;
      function tooltipShow1394241000000604320(el){
        var tooltip = el.nextElementSibling;
        var tooltipDisplay = tooltip.style.display;
        if (tooltipDisplay == 'none') {
          var allTooltip = document.getElementsByClassName('zcwf_tooltip_over');
          for (i = 0; i < allTooltip.length; i++ ) {
            allTooltip[i].style.display = 'none';
          }
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }
    </script>
    <script id='wf_anal' src='https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=d023568e1e3e6fa18f4c65deedbaf5bc7f1cd4b152b8e5a19ab6edcaef23b301e62ee712edde36cec4caa7ba4154a584gidacef6996ea9494b52c0598738546e612e2a0a5be6351888a2c61d75436d46e2dgidf646a7fe147ef8abef157542804ad5353ed0c88259c12374e1616665bee5deddgid9df265a27c59cea1a3209824dffe14bf32108b2470f9382cadb7d7c87376883a&tw=71ad78d900e1d4b8b9fc1253be7bad177119792698b6ee802bfee724b6dad136&version=v2'></script>
  </form>
</div>`;

const stripScriptTags = (html: string) => html.replace(/<script[\s\S]*?<\/script>/gi, "");

const zohoFormHtml2 = `
<div id = 'crmWebToEntityForm' class = 'zcwf_lblLeft crmWebToEntityForm' style = 'background-color: white;color: black;max-width: 600px;'>
  <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'>
  <META HTTP-EQUIV = 'content-type' CONTENT = 'text/html;charset=UTF-8'>
  <form id = 'webform1394241000000550005' action = 'https://crm.zoho.in/crm/WebToLeadForm' name = WebToLeads1394241000000550005 method = 'POST' onSubmit = 'javascript:document.charset="UTF-8"; return checkMandatory1394241000000550005()' accept-charset = 'UTF-8'>
    <input type = 'text' style = 'display:none;' name = 'xnQsjsdp' value = 'dcf9c09ca44b5db50269f4473000ac152f7be0e80acc8fb90f4757b6b36a9e27'>
    </input>
    <input type = 'hidden' name = 'zc_gad' id = 'zc_gad' value = ''>
    </input>
    <input type = 'text' style = 'display:none;' name = 'xmIwtLD' value = 'd5a822371e292333ab4fe6d48265fe0ed7a9faaf0c85b19778e40ee9e59a7317ef38de400e7df726a366bb3876b99c30'>
    </input>
    <input type = 'text' style = 'display:none;' name = 'actionType' value = 'TGVhZHM='>
    </input>
    <input type = 'text' style = 'display:none;' name = 'returnURL' value = 'null'>
    </input>
    <style>
      html,body{margin: 0px;} .formsubmit.zcwf_button{color: white !important;background: transparent linear-gradient(0deg, #0279FF 0%, #00A3F3 100%);} #crmWebToEntityForm.zcwf_lblLeft{width: 100%;padding: 25px;margin: 0 auto;box-sizing: border-box;} #crmWebToEntityForm.zcwf_lblLeft *{box-sizing: border-box;} #crmWebToEntityForm{text-align: left;} #crmWebToEntityForm *{direction: ltr;} .zcwf_lblLeft .zcwf_title{word-wrap: break-word;padding: 0px 6px 10px;font-weight: bold } .zcwf_lblLeft.cpT_primaryBtn:hover{background: linear-gradient(#02acff 0,#006be4 100%)no-repeat padding-box !important;box-shadow: 0 -2px 0 0 #0159b9 inset !important;border: 0 !important;color: #fff !important;outline: 0 !important;} .zcwf_lblLeft .zcwf_col_fld input[ type = text], input[ type = password], .zcwf_lblLeft .zcwf_col_fld textarea{width: 60%;border: 1px solid #c0c6cc !important;resize: vertical;border-radius: 2px;float: left;} .zcwf_lblLeft .zcwf_col_lab{width: 30%;word-break: break-word;padding: 0px 6px 0px;margin-right: 10px;margin-top: 5px;float: left;min-height: 1px;} .zcwf_lblLeft .zcwf_col_fld{float: left;width: 68%;padding: 0px 6px 0px;position: relative;margin-top: 5px;} .zcwf_lblLeft .zcwf_privacy{padding: 6px;} .zcwf_lblLeft .wfrm_fld_dpNn{display: none;} .dIB{display: inline-block;} .zcwf_lblLeft .zcwf_col_fld_slt{width: 60%;border: 1px solid #ccc;background: #fff;border-radius: 4px;font-size: 12px;float: left;resize: vertical;padding: 2px 5px;} .zcwf_lblLeft .zcwf_row:after, .zcwf_lblLeft .zcwf_col_fld:after{content: '';display: table;clear: both;} .zcwf_lblLeft .zcwf_col_help{float: left;margin-left: 7px;font-size: 12px;max-width: 35%;word-break: break-word;} .zcwf_lblLeft .zcwf_help_icon{cursor: pointer;width: 16px;height: 16px;display: inline-block;background: #fff;border: 1px solid #c0c6cc;color: #c1c1c1;text-align: center;font-size: 11px;line-height: 16px;font-weight: bold;border-radius: 50%;} .zcwf_lblLeft .zcwf_row{margin: 15px 0px;} .zcwf_lblLeft .formsubmit{margin-right: 5px;cursor: pointer;color: #313949;font-size: 12px;} .zcwf_lblLeft .zcwf_privacy_txt{width: 90%;color: rgb(0, 0, 0);font-size: 12px;font-family: Arial;display: inline-block;vertical-align: top;color: #313949;padding-top: 2px;margin-left: 6px;} .zcwf_lblLeft .zcwf_button{font-size: 12px;color: #313949;border: 1px solid #c0c6cc;padding: 3px 9px;border-radius: 4px;cursor: pointer;max-width: 120px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;} .zcwf_lblLeft .zcwf_tooltip_over{position: relative;} .zcwf_lblLeft .zcwf_tooltip_ctn{position: absolute;background: #dedede;padding: 3px 6px;top: 3px;border-radius: 4px;word-break: break-word;min-width: 100px;max-width: 150px;color: #313949;z-index: 100;} .zcwf_lblLeft .zcwf_ckbox{float: left;} .zcwf_lblLeft .zcwf_file{width: 55%;box-sizing: border-box;float: left;} .cBoth:after{content: '';display: block;clear: both;} @media all and (max-width: 600px){ .zcwf_lblLeft .zcwf_col_lab, .zcwf_lblLeft .zcwf_col_fld{width: auto;float: none !important;} .zcwf_lblLeft .zcwf_col_help{width: 40%;} }
    </style>
    <div class = 'zcwf_title' style = 'max-width: 600px;color: black; font-family:Arial;'>Get Quote</div>
    <div class = 'zcwf_row'>
      <div class = 'zcwf_col_lab' style = 'font-size:12px; font-family: Arial;'><label for = 'Last_Name'>Full Name <span style = 'color:red;'>*</span></label></div>
      <div class = 'zcwf_col_fld'><input type = 'text' id = 'Last_Name' aria-required = 'true' aria-label = 'Last Name' name = 'Last Name' aria-valuemax = '80' maxlength = '80'></input><div class = 'zcwf_col_help'></div></div>
    </div>
    <div class = 'zcwf_row'>
      <div class = 'zcwf_col_lab' style = 'font-size:12px; font-family: Arial;'><label for = 'Email'>Email <span style = 'color:red;'>*</span></label></div>
      <div class = 'zcwf_col_fld'><input type = 'text' ftype = 'email' autocomplete = 'false' id = 'Email' aria-required = 'true' aria-label = 'Email' name = 'Email' aria-valuemax = '100' crmlabel = '' maxlength = '100'></input><div class = 'zcwf_col_help'></div></div>
    </div>
    <div class = 'zcwf_row'>
      <div class = 'zcwf_col_lab' style = 'font-size:12px; font-family: Arial;'><label for = 'Phone'>Phone <span style = 'color:red;'>*</span></label></div>
      <div class = 'zcwf_col_fld'><input type = 'text' id = 'Phone' aria-required = 'true' aria-label = 'Phone' name = 'Phone' aria-valuemax = '30' maxlength = '30'></input><div class = 'zcwf_col_help'></div></div>
    </div>
    <div class = 'zcwf_row wfrm_fld_dpNn'>
      <div class = 'zcwf_col_lab' style = 'font-size:12px; font-family: Arial;'><label for = 'LEADCF1'>Google Click ID</label></div>
      <div class = 'zcwf_col_fld'><input type = 'text' id = 'LEADCF1' aria-required = 'false' aria-label = 'LEADCF1' name = 'LEADCF1' aria-valuemax = '255' maxlength = '255' value = '-'></input><div class = 'zcwf_col_help'></div></div>
    </div>
    <div class = 'zcwf_row'>
      <div class = 'zcwf_col_lab' style = 'font-size:12px; font-family: Arial;'><label for = 'Designation'>Amount</label></div>
      <div class = 'zcwf_col_fld'><input type = 'text' id = 'Designation' aria-required = 'false' aria-label = 'Designation' name = 'Designation' aria-valuemax = '100' maxlength = '100'></input><div class = 'zcwf_col_help'></div></div>
    </div>
    <div class = 'zcwf_row'>
      <div class = 'zcwf_col_lab' style = 'font-size:12px; font-family: Arial;'><label for = 'Fax'>Service</label></div>
      <div class = 'zcwf_col_fld'><input type = 'text' id = 'Fax' aria-required = 'false' aria-label = 'Fax' name = 'Fax' aria-valuemax = '30' maxlength = '30'></input><div class = 'zcwf_col_help'></div></div>
    </div>
    <input type = 'text' type = 'hidden' style = 'display: none;' name = 'aG9uZXlwb3Q' value = ''/>
    <div class = 'zcwf_row'>
      <div class = 'zcwf_col_lab'></div>
      <div class = 'zcwf_col_fld'><input type = 'submit' id = 'formsubmit' role = 'button' class = 'formsubmit zcwf_button' value = 'Submit' aria-label = 'Submit' title = 'Submit'>
        <input type = 'reset' class = 'zcwf_button' role = 'button' name = 'reset' value = 'Reset' aria-label = 'Reset' title = 'Reset'>
      </div>
    </div>
    <script>
      function validateEmail1394241000000550005(){
        var form = document.forms['WebToLeads1394241000000550005'];
        var emailFld = form.querySelectorAll('[ftype=email]');
        var i;
        for(i = 0; i < emailFld.length; i++ ) {
          var emailVal = emailFld[i].value;
          if ((emailVal.replace (/^\s+|\s+$/g,'') ) .length != 0) {
            var atpos = emailVal.indexOf('@');
            var dotpos = emailVal.lastIndexOf('.');
            if(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
              alert('Please enter a valid email address. ');
              emailFld[i].focus();
              return false;
            }
          }
        }
        return true;
      }
      function checkMandatory1394241000000550005(isAjax){
        var mndFileds = new Array('Last Name', 'Email', 'Phone');
        var fldLangVal = new Array('Full Name', 'Email', 'Phone');
        for (i = 0; i < mndFileds.length; i++ ) {
          var fieldObj = document.forms['WebToLeads1394241000000550005'] [mndFileds[i]];
          if (fieldObj) {
            if(((fieldObj.value) .replace (/^\s+|\s+$/g,'') ) .length == 0) {
              if (fieldObj.type == 'file') {
                alert('Please select a file to upload.');
                fieldObj.focus();
                return false;
              }
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            } else if (fieldObj.nodeName == 'SELECT') {
              if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                alert(fldLangVal[i] + ' cannot be none.');
                fieldObj.focus();
                return false;
              }
            } else if (fieldObj.type == 'checkbox') {
              if (fieldObj.checked == false) {
                alert('Please accept ' + fldLangVal[i]);
                fieldObj.focus();
                return false;
              }
            }
            try{
              if (fieldObj.name == 'Last Name') {
                name = fieldObj.value;
              }
            } catch (e){}
          }
        }
        if ( !validateEmail1394241000000550005 () ) {
          return false;
        }
        var urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has ('service') && (urlparams.get ('service') === 'smarturl') ) {
          var webform = document.getElementById('webform1394241000000550005');
          var service = urlparams.get('service');
          var smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service);
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
      }
      _wFa_ajax_will_be_replaced = false;
      if (typeof _wfa_fstprtcken == 'undefined') {
        _wfa_fstprtcken = {};
      }
      _wfa_fstprtcken[1394241000000550005] = true;
      function tooltipShow1394241000000550005(el){
        var tooltip = el.nextElementSibling;
        var tooltipDisplay = tooltip.style.display;
        if (tooltipDisplay == 'none') {
          var allTooltip = document.getElementsByClassName('zcwf_tooltip_over');
          for (i = 0; i < allTooltip.length; i++ ) {
            allTooltip[i].style.display = 'none';
          }
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }
    </script>
    <script id = 'wf_anal' src = 'https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=fcc37eb175672bc867bae7e9a3147c387ddd6a242dacb91df708fe2a3a8d4a94a55501d41b5e2ffe049c5ea83b9bfb1bgidfeb5d87609c5a7cc02b8b007cc31a15510868f04ec773c6fce329116ae5bd027gid8982ce5c45f91083ab3c5b5f02eca287b96997d19d27aaacb01ec344207e2353gid759baa46bcd67586fa7f2b7b40d91c0b70f493e28688460ce3f80ddb84f31008&tw=8fd7c75f48e333b5f4475da68e3118753a123924dae55c135878eef0089ce6e2&version=v2'></script>
  </form>
</div>`;

export default function ShopkeeperPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptText = `
      function checkMandatory1394241000000604320(isAjax){
        var mndFileds = new Array('Last Name');
        var fldLangVal = new Array('Last Name');
        for (i = 0; i < mndFileds.length; i++ ) {
          var fieldObj = document.forms['WebToLeads1394241000000604320'] [mndFileds[i]];
          if (fieldObj) {
            if(((fieldObj.value) .replace (/^\s+|\s+$/g,'') ) .length == 0) {
              if (fieldObj.type == 'file') {
                alert('Please select a file to upload.');
                fieldObj.focus();
                return false;
              }
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            } else if (fieldObj.nodeName == 'SELECT') {
              if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                alert(fldLangVal[i] + ' cannot be none.');
                fieldObj.focus();
                return false;
              }
            } else if (fieldObj.type == 'checkbox') {
              if (fieldObj.checked == false) {
                alert('Please accept ' + fldLangVal[i]);
                fieldObj.focus();
                return false;
              }
            }
            try{
              if (fieldObj.name == 'Last Name') { name = fieldObj.value; }
            } catch (e){}
          }
        }
        var urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has ('service') && (urlparams.get ('service') === 'smarturl') ) {
          var webform = document.getElementById('webform1394241000000604320');
          var service = urlparams.get('service');
          var smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service);
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
      }
      _wFa_ajax_will_be_replaced = false;
      if (typeof _wfa_fstprtcken == 'undefined') {
        _wfa_fstprtcken = {};
      }
      _wfa_fstprtcken[1394241000000604320] = true;
      function tooltipShow1394241000000604320(el){
        var tooltip = el.nextElementSibling;
        var tooltipDisplay = tooltip.style.display;
        if (tooltipDisplay == 'none') {
          var allTooltip = document.getElementsByClassName('zcwf_tooltip_over');
          for (i = 0; i < allTooltip.length; i++ ) {
            allTooltip[i].style.display = 'none';
          }
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }
    `;

    const scriptText2 = `
      function validateEmail1394241000000550005(){
        var form = document.forms['WebToLeads1394241000000550005'];
        var emailFld = form.querySelectorAll('[ftype=email]');
        var i;
        for(i = 0; i < emailFld.length; i++ ) {
          var emailVal = emailFld[i].value;
          if ((emailVal.replace (/^\s+|\s+$/g,'') ) .length != 0) {
            var atpos = emailVal.indexOf('@');
            var dotpos = emailVal.lastIndexOf('.');
            if(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
              alert('Please enter a valid email address. ');
              emailFld[i].focus();
              return false;
            }
          }
        }
        return true;
      }
      function checkMandatory1394241000000550005(isAjax){
        var mndFileds = new Array('Last Name', 'Email', 'Phone');
        var fldLangVal = new Array('Full Name', 'Email', 'Phone');
        for (i = 0; i < mndFileds.length; i++ ) {
          var fieldObj = document.forms['WebToLeads1394241000000550005'] [mndFileds[i]];
          if (fieldObj) {
            if(((fieldObj.value) .replace (/^\s+|\s+$/g,'') ) .length == 0) {
              if (fieldObj.type == 'file') {
                alert('Please select a file to upload.');
                fieldObj.focus();
                return false;
              }
              alert(fldLangVal[i] + ' cannot be empty.');
              fieldObj.focus();
              return false;
            } else if (fieldObj.nodeName == 'SELECT') {
              if (fieldObj.options[fieldObj.selectedIndex].value == '-None-') {
                alert(fldLangVal[i] + ' cannot be none.');
                fieldObj.focus();
                return false;
              }
            } else if (fieldObj.type == 'checkbox') {
              if (fieldObj.checked == false) {
                alert('Please accept ' + fldLangVal[i]);
                fieldObj.focus();
                return false;
              }
            }
            try{
              if (fieldObj.name == 'Last Name') {
                name = fieldObj.value;
              }
            } catch (e){}
          }
        }
        if ( !validateEmail1394241000000550005 () ) {
          return false;
        }
        var urlparams = new URLSearchParams(window.location.search);
        if (urlparams.has ('service') && (urlparams.get ('service') === 'smarturl') ) {
          var webform = document.getElementById('webform1394241000000550005');
          var service = urlparams.get('service');
          var smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service);
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
        document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
      }
      _wFa_ajax_will_be_replaced = false;
      if (typeof _wfa_fstprtcken == 'undefined') {
        _wfa_fstprtcken = {};
      }
      _wfa_fstprtcken[1394241000000550005] = true;
      function tooltipShow1394241000000550005(el){
        var tooltip = el.nextElementSibling;
        var tooltipDisplay = tooltip.style.display;
        if (tooltipDisplay == 'none') {
          var allTooltip = document.getElementsByClassName('zcwf_tooltip_over');
          for (i = 0; i < allTooltip.length; i++ ) {
            allTooltip[i].style.display = 'none';
          }
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }
    `;

    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.textContent = scriptText;
    document.body.appendChild(inlineScript);

    const inlineScript2 = document.createElement("script");
    inlineScript2.type = "text/javascript";
    inlineScript2.textContent = scriptText2;
    document.body.appendChild(inlineScript2);

    const analyticsScript = document.createElement("script");
    analyticsScript.id = "wf_anal_shopkeeper";
    analyticsScript.src = "https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=d023568e1e3e6fa18f4c65deedbaf5bc7f1cd4b152b8e5a19ab6edcaef23b301e62ee712edde36cec4caa7ba4154a584gidacef6996ea9494b52c0598738546e612e2a0a5be6351888a2c61d75436d46e2dgidf646a7fe147ef8abef157542804ad5353ed0c88259c12374e1616665bee5deddgid9df265a27c59cea1a3209824dffe14bf32108b2470f9382cadb7d7c87376883a&tw=71ad78d900e1d4b8b9fc1253be7bad177119792698b6ee802bfee724b6dad136&version=v2";
    analyticsScript.async = true;
    document.body.appendChild(analyticsScript);

    const analyticsScript2 = document.createElement("script");
    analyticsScript2.id = "wf_anal_shopkeeper_2";
    analyticsScript2.src = "https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=fcc37eb175672bc867bae7e9a3147c387ddd6a242dacb91df708fe2a3a8d4a94a55501d41b5e2ffe049c5ea83b9bfb1bgidfeb5d87609c5a7cc02b8b007cc31a15510868f04ec773c6fce329116ae5bd027gid8982ce5c45f91083ab3c5b5f02eca287b96997d19d27aaacb01ec344207e2353gid759baa46bcd67586fa7f2b7b40d91c0b70f493e28688460ce3f80ddb84f31008&tw=8fd7c75f48e333b5f4475da68e3118753a123924dae55c135878eef0089ce6e2&version=v2";
    analyticsScript2.async = true;
    document.body.appendChild(analyticsScript2);

    return () => {
      inlineScript.remove();
      inlineScript2.remove();
      analyticsScript.remove();
      analyticsScript2.remove();
    };
  }, []);

  return (
    <div className="w-full font-sans bg-[#f8f9fa] text-[#0f172a] antialiased overflow-x-hidden">
      {/* Keyframe animation helpers */}
      <style>{`
        @keyframes skDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes skPop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes skSpin {
          to { transform: rotate(360deg); }
        }
        .sk-draw { stroke-dashoffset: 600; animation: skDraw 2.4s ease forwards; }
        .sk-draw-d2 { animation-delay: 0.35s; }
        .sk-draw-d3 { animation-delay: 0.7s; }
        .sk-draw-d4 { animation-delay: 1.05s; }
        .sk-pop-1 { opacity: 0; animation: skPop 0.5s ease 1.5s forwards; }
        .sk-pop-2 { opacity: 0; animation: skPop 0.5s ease 1.75s forwards; }
        .sk-pop-3 { opacity: 0; animation: skPop 0.5s ease 2s forwards; }
        .sk-pop-4 { opacity: 0; animation: skPop 0.5s ease 2.25s forwards; }
        .sk-yarn { transform-box: fill-box; transform-origin: center; animation: skSpin 30s linear infinite; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* ── 1. HERO CONTAINER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-2">

        {/* ── DESKTOP HERO (md and above) ── */}
        <div className="hidden md:flex relative overflow-hidden rounded-[28px] lg:rounded-[32px] text-white border border-white/10 shadow-2xl min-h-[460px] lg:min-h-[500px] flex-col justify-center">
          <Image
            src="/laptop banner.webp"
            alt="Export From India - Manvi International Courier"
            fill
            priority
            unoptimized
            className="object-cover object-right lg:object-center"
          />
          {/* Scrim only behind text on the left, leaving the 3D graphics on the right 100% crisp and clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent" />

          <div className="relative z-10 px-8 lg:px-12 py-6 lg:py-8 max-w-3xl flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-3 overflow-hidden" style={{ height: "36px" }}>
              <img
                src="/logo-png.png"
                alt="Manvi International Courier"
                style={{ height: "100px", marginTop: "-30px", width: "auto", display: "block" }}
              />
            </div>

            <h1 className="text-[36px] lg:text-[44px] xl:text-[50px] font-extrabold text-white leading-[1.15] tracking-tight mt-1">
              You already ship from India. <span className="text-[#ff7a00]">Let&apos;s ship it smarter.</span>
            </h1>

            <p className="mt-4 lg:mt-5 text-[15px] lg:text-[16.5px] text-slate-200 leading-relaxed max-w-xl font-medium">
              Garments, utensils, handicrafts, food or machine parts. Whatever you export, Manvi picks it up directly from your
              doorstep, packs it export-ready, clears customs and delivers worldwide through DHL, FedEx, UPS and
              Aramex at competitive rates.
            </p>

            <div className="flex flex-row gap-4 mt-7 lg:mt-8">
              <a
                href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20to%20compare%20my%20shipping%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] lg:text-[16px] px-7 py-3.5 lg:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                </svg>
                <span>Compare your rate</span>
              </a>
              <a
                href="tel:+917070506070"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[15px] lg:text-[16px] px-7 py-3.5 lg:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                Call +91 70 70 50 60 70
              </a>
            </div>

            <div className="flex gap-10 mt-7 lg:mt-8 pt-5 lg:pt-6 border-t border-white/15">
              <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                <div className="text-[22px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-none">1M+</div>
                <div className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">Shipments</div>
              </div>
              <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                <div className="text-[22px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-none">100K+</div>
                <div className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">Customers</div>
              </div>
              <div className="border-l-[3px] border-[#ff7a00] pl-3.5">
                <div className="text-[22px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-none">200+</div>
                <div className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-slate-300 mt-1">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE HERO (below md) ── */}
        <div className="md:hidden relative overflow-hidden rounded-[20px] text-white border border-white/10 shadow-2xl w-full aspect-[398/485] min-h-[485px] flex flex-col">
          <Image
            src="/shopkeeper-hero-mobile.jpg"
            alt="Export From India - Manvi International Courier"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 398px"
            className="object-cover object-center"
          />
          {/* Soft gradient so the background artwork remains clear and visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/15" />

          <div className="relative z-10 px-5 pt-5 pb-5 flex flex-col justify-between flex-grow">
            {/* Top group: Logo, Heading, Description */}
            <div>
              {/* Logo */}
              <div className="mb-3 overflow-hidden" style={{ height: "30px" }}>
                <img
                  src="/logo-png.png"
                  alt="Manvi International Courier"
                  style={{ height: "80px", marginTop: "-20px", width: "auto", display: "block" }}
                />
              </div>

              <h1 className="text-3xl font-extrabold text-white leading-[1.2] tracking-tight">
                You already ship from India. <span className="text-[#ff7a00]">Let&apos;s ship it smarter.</span>
              </h1>
              <div className="w-[50vw]">
                <p className="mt-3 text-sm text-slate-200 leading-relaxed font-medium">
                  Manvi picks up from your doorstep, packs it export-ready, clears customs and delivers worldwide.
                </p>
              </div>

            </div>

            {/* Bottom group: CTA Buttons & Stats Counters */}
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20to%20compare%20my%20shipping%20rates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-bold text-[14px] px-5 py-2.5 rounded-full bg-[#23c961]/90 text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] transition-all text-center"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                  </svg>
                  <span>Compare your rate on WhatsApp</span>
                </a>
                <a
                  href="tel:+917070506070"
                  className="inline-flex items-center justify-center gap-2 font-bold text-[14px] px-5 py-2.5 rounded-full bg-black/45 text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all text-center"
                >
                  Call +91 70 70 50 60 70
                </a>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-2 pt-3 bg-black/45 backdrop-blur-sm rounded-2xl pb-3 pl-3 pr-2 border border-white/15">
                <div className="border-l-2 border-[#ff7a00] pl-2">
                  <div className="text-[18px] font-extrabold text-white leading-none">1M+</div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-300 mt-1">Shipments</div>
                </div>
                <div className="border-l-2 border-[#ff7a00] pl-2">
                  <div className="text-[18px] font-extrabold text-white leading-none">100K+</div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-300 mt-1">Customers</div>
                </div>
                <div className="border-l-2 border-[#ff7a00] pl-2">
                  <div className="text-[18px] font-extrabold text-white leading-none">200+</div>
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-300 mt-1">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── 2. PARTNERS ── */}
      <div className="w-full bg-[#0f172a] text-white py-5 sm:py-7 border-y border-white/10 mt-4 sm:mt-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 text-center sm:text-left">
          <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-slate-300">
            One partner, every major carrier
          </span>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center sm:justify-end gap-3.5 sm:gap-8 items-center font-extrabold text-[15px] sm:text-[18px] md:text-[20px] text-white/90">
            <span>DHL</span>
            <span>FedEx</span>
            <span>UPS</span>
            <span>Aramex</span>
            <span>DPD</span>
            <span>Courier&nbsp;Please</span>
          </div>
        </div>
      </div>

      {/* ── 2.5 LEAD / QUOTE FORM CONTAINER ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-6 sm:py-10" id="quote">
        <div className="bg-[#0f172a] text-white border border-white/10 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#ff7a00]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Copy */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
                <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
                Get your quote
              </div>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold text-white leading-tight">
                Tell us what you ship. <span className="text-[#ff7a00]">Get a rate that beats your current one.</span>
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[16px] text-slate-300 leading-relaxed">
                Fill this in and we will send a clear quote on WhatsApp, usually within a few hours. No obligation and no switching hassle.
              </p>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-slate-200 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Free rate comparison against what you pay today
                </li>
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-slate-200 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Customs, packing and documentation handled for you
                </li>
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-slate-200 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  Doorstep pickup across North and West India
                </li>
                <li className="flex items-center gap-3 text-[14px] sm:text-[15px] text-slate-200 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] flex items-center justify-center font-bold text-[12px] shrink-0">
                    ✓
                  </span>
                  One dedicated logistics contact on WhatsApp
                </li>
              </ul>
            </div>

            {/* Right Form Card - Styled in Brand Orange Theme */}
            <div className="bg-gradient-to-br from-[#ff7a00] to-[#e66c00] text-white border border-orange-400/30 rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(255,122,0,0.4)] relative overflow-hidden">
              <div
                className="relative z-10 [&_.zcwf_lblLeft]:!w-full [&_.zcwf_lblLeft]:!max-w-none [&_.zcwf_lblLeft]:!p-0 [&_.zcwf_lblLeft]:!bg-transparent [&_.zcwf_lblLeft]:!text-white [&_.zcwf_row]:!mt-2 [&_.zcwf_col_lab]:!text-white [&_.zcwf_col_lab]:!text-[11px] [&_.zcwf_col_lab]:!font-bold [&_.zcwf_col_lab]:!tracking-[0.12em] [&_.zcwf_col_lab]:!uppercase [&_.zcwf_col_lab]:!text-white/90 [&_.zcwf_col_fld]:!w-full [&_.zcwf_col_fld]:!float-none [&_input[type='text']]:!w-full [&_input[type='text']]:!rounded-xl [&_input[type='text']]:!border [&_input[type='text']]:!border-white/80 [&_input[type='text']]:!bg-white [&_input[type='text']]:!px-3 [&_input[type='text']]:!py-2.5 [&_input[type='text']]:!text-slate-900 [&_input[type='text']]:!text-[14.5px] [&_input[type='text']]:!placeholder:text-slate-400 [&_input[type='submit']]:!w-full [&_input[type='submit']]:!bg-[#0f172a] [&_input[type='submit']]:!text-white [&_input[type='submit']]:!rounded-full [&_input[type='submit']]:!px-6 [&_input[type='submit']]:!py-3 [&_input[type='submit']]:!font-bold [&_input[type='submit']]:!tracking-wide [&_input[type='reset']]:!ml-2 [&_input[type='reset']]:!bg-white/10 [&_input[type='reset']]:!text-white [&_input[type='reset']]:!border [&_input[type='reset']]:!border-white/30 [&_input[type='reset']]:!rounded-full [&_input[type='reset']]:!px-5 [&_input[type='reset']]:!py-2.5 [&_input[type='reset']]:!font-bold"
                dangerouslySetInnerHTML={{ __html: stripScriptTags(zohoFormHtml) }}
              />

              <div className="mt-8 border-t border-white/20 pt-6">
                <div className="mb-3 text-[11px] font-bold tracking-[0.16em] uppercase text-white/80">Secondary enquiry form</div>
                <div
                  className="relative z-10 [&_.zcwf_lblLeft]:!w-full [&_.zcwf_lblLeft]:!max-w-none [&_.zcwf_lblLeft]:!p-0 [&_.zcwf_lblLeft]:!bg-transparent [&_.zcwf_lblLeft]:!text-white [&_.zcwf_row]:!mt-2 [&_.zcwf_col_lab]:!text-white [&_.zcwf_col_lab]:!text-[11px] [&_.zcwf_col_lab]:!font-bold [&_.zcwf_col_lab]:!tracking-[0.12em] [&_.zcwf_col_lab]:!uppercase [&_.zcwf_col_lab]:!text-white/90 [&_.zcwf_col_fld]:!w-full [&_.zcwf_col_fld]:!float-none [&_input[type='text']]:!w-full [&_input[type='text']]:!rounded-xl [&_input[type='text']]:!border [&_input[type='text']]:!border-white/80 [&_input[type='text']]:!bg-white [&_input[type='text']]:!px-3 [&_input[type='text']]:!py-2.5 [&_input[type='text']]:!text-slate-900 [&_input[type='text']]:!text-[14.5px] [&_input[type='text']]:!placeholder:text-slate-400 [&_input[type='submit']]:!w-full [&_input[type='submit']]:!bg-[#0f172a] [&_input[type='submit']]:!text-white [&_input[type='submit']]:!rounded-full [&_input[type='submit']]:!px-6 [&_input[type='submit']]:!py-3 [&_input[type='submit']]:!font-bold [&_input[type='submit']]:!tracking-wide [&_input[type='reset']]:!ml-2 [&_input[type='reset']]:!bg-white/10 [&_input[type='reset']]:!text-white [&_input[type='reset']]:!border [&_input[type='reset']]:!border-white/30 [&_input[type='reset']]:!rounded-full [&_input[type='reset']]:!px-5 [&_input[type='reset']]:!py-2.5 [&_input[type='reset']]:!font-bold"
                  dangerouslySetInnerHTML={{ __html: stripScriptTags(zohoFormHtml2) }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE SHIP ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Whatever you export
          </div>
          <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            If you send it abroad, we move it.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-[14.5px] sm:text-[16px] md:text-[17px] text-[#555555] leading-relaxed">
            No matter what you sell, we can ship it. From a single sample to a full bulk consignment- packed export-ready and delivered worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">👕</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Garments &amp; textiles</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Apparel, fabrics, home linen and made-ups in retail quantities or bulk cartons.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">🍽️</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Utensils &amp; kitchenware</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Steel, brass, cookware and small appliances, packed carefully to arrive dent-free.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">🪔</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Handicrafts &amp; home décor</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Fragile, artisan and decorative goods, export-packed to survive the global journey.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">🫙</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Food &amp; packaged goods</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Spices, snacks, dry foods and FMCG, shipped with proper export documentation.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">⚙️</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Parts, tools &amp; samples</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Components, machinery parts and commercial samples for your buyers overseas.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[18px] sm:rounded-[20px] p-5 sm:p-8 relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all">
            <span className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#ff7a00] bg-[#fff5ed] border border-orange-200 px-2.5 py-1 rounded-full">
              Anything else?
            </span>
            <span className="text-[28px] sm:text-[32px] leading-none mb-3 sm:mb-4 block">📦</span>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0f172a]">Not on this list?</h3>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              Send us a photo on WhatsApp. We will confirm if we can ship it, how to pack it and what it costs.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-4 sm:py-6">
        <div className="bg-[#0f172a] text-white rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              How it works
            </div>
            <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-white leading-tight">
              You run the business. We run the logistics.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[16px] text-slate-300 leading-relaxed">
              No juggling carriers and no customs forms to fill. Send your shipment details on WhatsApp and we handle it end
              to end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 lg:gap-6 relative">
            <div className="relative p-4 sm:p-0 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none border border-white/10 sm:border-0">
              <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[18px] sm:text-[20px] grid place-items-center mb-4 sm:mb-5">
                1
              </div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-white mb-1.5 sm:mb-2">Send your shipment details</h3>
              <p className="text-[13.5px] sm:text-[15px] text-slate-300 leading-relaxed">
                WhatsApp what you are sending, the weight and the destination. We reply with a clear quote.
              </p>
            </div>

            <div className="relative p-4 sm:p-0 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none border border-white/10 sm:border-0">
              <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[18px] sm:text-[20px] grid place-items-center mb-4 sm:mb-5">
                2
              </div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-white mb-1.5 sm:mb-2">We pick up from your door</h3>
              <p className="text-[13.5px] sm:text-[15px] text-slate-300 leading-relaxed">
                Collection from your shop, factory or godown anywhere in North and West India, with pan-India pickup on request.
              </p>
            </div>

            <div className="relative p-4 sm:p-0 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none border border-white/10 sm:border-0">
              <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[18px] sm:text-[20px] grid place-items-center mb-4 sm:mb-5">
                3
              </div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-white mb-1.5 sm:mb-2">We pack, ship &amp; clear customs</h3>
              <p className="text-[13.5px] sm:text-[15px] text-slate-300 leading-relaxed">
                Export-grade packing plus all documentation and clearance, handled for you across our carrier network.
              </p>
            </div>

            <div className="relative p-4 sm:p-0 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none border border-white/10 sm:border-0">
              <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#1e293b] border border-[#ff7a00]/50 text-[#ff7a00] font-extrabold text-[18px] sm:text-[20px] grid place-items-center mb-4 sm:mb-5">
                4
              </div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-white mb-1.5 sm:mb-2">Delivered &amp; tracked</h3>
              <p className="text-[13.5px] sm:text-[15px] text-slate-300 leading-relaxed">
                Door delivery to your buyer abroad with live tracking. Set up recurring pickups for regular orders anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. RATE COMPARE HIGHLIGHT BOX ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[#0f172a] text-white p-5 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          {/* Radial Glow */}
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.25),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-12 items-center">
            <div>
              <h2 className="text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold text-white leading-tight">
                Already paying for shipping? Let&apos;s beat it.
              </h2>
              <p className="mt-2.5 sm:mt-3.5 text-[14px] sm:text-[16px] text-slate-300 leading-relaxed max-w-xl">
                Send us a recent invoice or your typical weight, destination and volume. We will come back
                with a quote and show you the difference, with no obligation and no switching hassle.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-3.5">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00]">
                Free rate comparison
              </span>
              <a
                href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20here%20are%20my%20current%20export%20shipping%20details%20to%20compare%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
                </svg>
                <span>Send my details</span>
              </a>
              <a
                href="tel:+917070506070"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
              >
                Call +91 70 70 50 60 70
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY EXPORTERS SWITCH ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Why exporters switch to Manvi
          </div>
          <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#0f172a] leading-tight">
            A logistics partner that protects your margins.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-slate-200 border border-slate-200 rounded-[18px] sm:rounded-[20px] overflow-hidden shadow-sm">
          <div className="bg-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">01</div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">Rates that beat the market</h3>
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                Transparent per-kg pricing by weight, destination and transit speed. Share your current bill and we will try to
                beat it.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">02</div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">Every major carrier, one desk</h3>
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                DHL, FedEx, UPS and Aramex under one account. We pick the best route for each shipment.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">03</div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">Customs &amp; paperwork done</h3>
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                Commercial invoices, packing lists and clearance handled so your goods never get stuck at the border.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">04</div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">Doorstep pickup, pan-India</h3>
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                From your shop, factory or godown across North and West India, with pan-India pickup on request.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">05</div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">Bulk &amp; recurring shipments</h3>
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                From a single sample carton to scheduled weekly, monthly and seasonal exports for your regular buyers.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[13px] sm:text-[14px] font-extrabold text-[#ff7a00] tracking-wide mb-2 sm:mb-2.5">06</div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">A dedicated point of contact</h3>
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
                A real logistics specialist on WhatsApp who knows your account and your orders, not a frustrating call center queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. WHO IT'S FOR ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-5 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
              Built for exporters like you
            </div>
            <h2 className="text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold text-[#0f172a] leading-tight">
              If you are already shipping out of India, this is for you.
            </h2>
            <p className="mt-2 sm:mt-2.5 text-[14px] sm:text-[16px] text-[#555555] leading-relaxed">
              Whatever your product and whatever your consignment volume, we have moved similar goods across global borders.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              "Garment & apparel exporters",
              "Utensil & kitchenware exporters",
              "Handicraft & décor exporters",
              "Food & spice exporters",
              "Wholesale traders & suppliers",
              "Online sellers shipping abroad",
              "Manufacturers & sample shippers",
            ].map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 bg-[#f8f9fa] border border-slate-200 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[15px] font-semibold text-[#0f172a] shadow-sm hover:border-[#ff7a00] transition-colors"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff7a00]" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="w-full max-w-[1000px] mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Questions? Glad you asked
          </div>
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#0f172a] leading-tight">
            What exporters ask us first.
          </h2>
        </div>

        <div className="flex flex-col">
          {[
            {
              q: "Can you beat my current shipping rate?",
              a: "Often, yes. Share a recent invoice or your typical weight, destination and volume, and we will quote and show you the difference with no obligation.",
              defaultOpen: true,
            },
            {
              q: "Do you handle export documentation and customs?",
              a: "Yes. Commercial invoices, packing lists, clearance and all carrier paperwork are handled for you, so your goods keep moving across the border without delays.",
            },
            {
              q: "What is the minimum weight I can ship?",
              a: "Anything from a single parcel or sample to full bulk consignments. WhatsApp your details and we will advise the most cost-effective option.",
            },
            {
              q: "Which countries do you deliver to?",
              a: "Core lanes include the USA, UK, Canada, Australia and Europe, as well as worldwide delivery across 200+ countries through our carrier partners.",
            },
            {
              q: "Can you set up regular, recurring pickups?",
              a: "Yes. Many exporters run scheduled weekly, monthly or seasonal shipments with us tailored to their production and order flow.",
            },
            {
              q: "Where do you pick up from in India?",
              a: "Doorstep pickup is available across Punjab, Delhi NCR, Haryana. Further, with pan-India pickup arranged upon request.",
            },
            {
              q: "What items cannot be shipped?",
              a: "We do not ship hazardous chemicals, currency, precious stones or prohibited goods. If you are ever unsure about an item, send a photo on WhatsApp and we will confirm before booking.",
            },
            {
              q: "How do I get started?",
              a: "Send your shipment details on WhatsApp. You will receive a quote, we will schedule the pickup, and handle packing, customs and international delivery from there.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              open={faq.defaultOpen}
              className="group border-b border-slate-200 py-3.5 sm:py-4 transition-all"
            >
              <summary className="list-none cursor-pointer flex items-center justify-between text-[15.5px] sm:text-[18px] md:text-[19px] font-bold text-[#0f172a] select-none gap-2">
                <span>{faq.q}</span>
                <span className="text-[#ff7a00] font-bold text-[20px] sm:text-[24px] ml-2 shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15.5px] text-[#555555] leading-relaxed pr-2 sm:pr-6">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 pt-4 pb-12 sm:pb-16">
        <div className="rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-[radial-gradient(120%_130%_at_15%_0%,#1e293b_0%,#0f172a_60%)] text-white text-center p-6 sm:p-10 lg:p-16 border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#ff7a00] mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-6 h-[2px] bg-[#ff7a00] rounded-full" />
            Ready when you are
          </div>

          <h2 className="text-[24px] sm:text-[34px] lg:text-[46px] font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Get a quote before your next shipment goes out.
          </h2>

          <p className="mt-3.5 sm:mt-4 text-[16px] sm:text-[19px] md:text-[20px] text-[#ff7a00] italic font-medium">
            &ldquo;Aap export karo, pickup, customs aur delivery hum sambhaal lenge.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href="https://wa.me/917070506070?text=Hi%20Manvi%2C%20I%20export%20from%20India%20and%20want%20a%20shipping%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#23c961] text-[#0a111e] shadow-[0_8px_22px_-8px_rgba(35,201,97,0.6)] hover:bg-[#1fb855] hover:-translate-y-0.5 transition-all text-center"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.05-1.03.07-1.66-.1a13.6 13.6 0 0 1-5.9-4.53c-.44-.58-1.1-1.56-1.1-2.98 0-1.42.75-2.12 1.02-2.4a1.05 1.05 0 0 1 .77-.36c.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.8 2.02.87 2.16.07.15.12.32.02.5-.1.19-.15.3-.3.47-.15.18-.3.4-.44.53-.15.15-.3.3-.13.6.18.3.8 1.3 1.7 2.1 1.18 1.05 2.16 1.37 2.47 1.53.3.15.48.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.34.07.13.07.72-.15 1.34Z" />
              </svg>
              <span>WhatsApp us your details</span>
            </a>
            <a
              href="tel:+917070506070"
              className="inline-flex items-center justify-center gap-2.5 font-bold text-[14px] sm:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all text-center"
            >
              Call +91 70 70 50 60 70
            </a>
          </div>

          <p className="mt-4 sm:mt-5 text-[12.5px] sm:text-[14px] text-slate-300">
            Standard doorstep pickup across Punjab, Delhi NCR, Haryana and Rajasthan. Gujarat, Mumbai and pan-India available on request. Delivered worldwide.
          </p>
        </div>
      </section>
    </div>
  );
}
