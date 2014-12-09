$.extend( $.expr[":"], {
 containsExact: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   return function(elem) {
    return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
  },

 containsExactCase: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   return function(elem) {
    return $.trim(elem.innerHTML) === text;
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   return $.trim(elem.innerHTML) === match[3];
  },

 containsRegex: $.expr.createPseudo ?
  $.expr.createPseudo(function(text) {
   var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(text);
   return function(elem) {
    return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
   };
  }) :
  // support: jQuery <1.8
  function(elem, i, match) {
   var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(match[3]);
   return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
  }

});

$(document).ready(function(){

var thisUserAccount = $().SPServices.SPGetCurrentUser({
	fieldNames: ["Name", "Title"],
	debug: false
});

//alert(thisUserAccount.Title);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'/'+mm+'/'+yyyy;
//alert(today);

$("legend:containsExactCase('[OPTIONAL] Proposed Due Date - Responsible Person to Complete')").parent('fieldset').parent('div').parent('td').parent('tr').hide(); 
$("legend:containsExactCase('Agreed Due Date - Originator may Update ')").parent('fieldset').parent('div').parent('td').parent('tr').hide(); 
$("legend:containsExactCase('Completion of Corrrective Actions - Responsible Person to Complete')").parent('fieldset').parent('div').parent('td').parent('tr').hide();
$("legend:containsExactCase('Verification and Closing of Corrective Actions - Originator to Complete')").parent('fieldset').parent('div').parent('td').parent('tr').hide(); 
 
$("input[title$='On Behalf']").change(function(){
    $("nobr:containsExactCase('Originator Name')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[oldtitle$='On Behalf']").is(':checked')){
		if (document.getElementById('ctl00_m_g_a762efd1_8480_41c8_aeac_25368e4cdf72_ctl00_ListFieldIterator2_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_UserField_upLevelDiv') != null) {
			document.getElementById('ctl00_m_g_a762efd1_8480_41c8_aeac_25368e4cdf72_ctl00_ListFieldIterator2_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_UserField_upLevelDiv').innerHTML = '';
			updateControlValue('ctl00_m_g_a762efd1_8480_41c8_aeac_25368e4cdf72_ctl00_ListFieldIterator2_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_UserField');
		$("input[title$='Originator']").val(thisUserAccount.Title);
		}
	} else {
		$("input[title$='Originator']").val("");
	}
});

$("textarea[title$='Discription of Issue']").focus(function(){
	if ($("input[oldtitle$='On Behalf']").is(':checked')){
		var oriper = $().SPServices.SPFindPeoplePicker({peoplePickerDisplayName: "Originator Name"});
		if (oriper.currentValue.length<1) {
			alert("Please make sure you enter a proper Originator Name above before you proceed.");
		}
	} else {
		$("input[title$='Originator']").val(thisUserAccount.Title);
	}
});

$("select[title$='Source']").focus(function(){
	if ($("input[oldtitle$='On Behalf']").is(':checked')){
		var oriper2 = $().SPServices.SPFindPeoplePicker({peoplePickerDisplayName: "Originator Name"});
		$("input[title$='Originator']").val(oriper2.currentValue.substring(0,oriper2.currentValue.length-2));
	} 
});

$("input[title$='Recommended Due Date']").focusout(function(){
	var ddate=$("input[oldtitle$='Recommended Due Date']").val();
	$("input[oldtitle$='Agreed Due Date']").val(ddate);
});

$("input[title$='Proposed Due Date']").focusout(function(){
	var pdate=$("input[oldtitle$='Proposed Due Date']").val();
	$("input[oldtitle$='Agreed Due Date']").val(pdate);
});



$("input[title$='Propose a Due Date?']").change(function(){
	$("nobr:containsExactCase('Proposed Due Date')").parent('h3').parent('td').parent('tr').toggle();
	$("nobr:containsExactCase('Reason for Proposal')").parent('h3').parent('td').parent('tr').toggle();
	if (!$("input[oldtitle$='Propose a Due Date?']").is(':checked')){
		$("textarea[oldtitle$='Reason for Proposal']").val("");
		$("input[title$='Proposed Due Date']").val("");
    }
});

$("input[title$='Completed']").change(function(){
	$("nobr:containsExactCase('Comments on Completion')").parent('h3').parent('td').parent('tr').toggle();
	if ($("input[oldtitle$='Completed']").is(':checked')){
        $("input[title$='Completed by']").val(thisUserAccount.Title);
        $("input[title$='Date of Completion']").val(today);
		$("nobr:containsExactCase('Verified and Closed')").parent('h3').parent('td').parent('tr').show();
    } else {
		$("textarea[oldtitle$='Comments on Completion']").val("");
		$("nobr:containsExactCase('Verified and Closed')").parent('h3').parent('td').parent('tr').hide();
		$("nobr:containsExactCase('Comments on Verification')").parent('h3').parent('td').parent('tr').hide();
		$("input[oldtitle$='Verified and Closed']").removeAttr('checked');
		$("input[title$='Completed by']").val("");
        $("input[title$='Date of Completion']").val("");
        $("input[title$='Verified and Closed by']").val("");
        $("input[title$='Verified and Closed Date']").val("");
		$("textarea[oldtitle$='Comments on Verification']").val("");
    }
});

$("input[title$='Verified and Closed']").change(function(){
	if ($("input[oldtitle$='Verified and Closed']").is(':checked')){
		var resper = $().SPServices.SPFindPeoplePicker({peoplePickerDisplayName: "Responsible Person"});
		if (resper.currentValue.substring(0,resper.currentValue.length-2)==thisUserAccount.Title){
			alert("As the responsible person you are not allowed to verify and close this corrective action. Please get someone else appropriate to verify and close instead. You may seek clarification from your WHS Coordinator.");
			$("input[oldtitle$='Verified and Closed']").removeAttr('checked');
		} else {
		$("input[title$='Verified and Closed by']").val(thisUserAccount.Title);
        $("input[title$='Verified and Closed Date']").val(today);
		$("nobr:containsExactCase('Comments on Verification')").parent('h3').parent('td').parent('tr').show();
		}
    } else {
		$("textarea[oldtitle$='Comments on Verification']").val("");
        $("input[title$='Verified and Closed by']").val("");
        $("input[title$='Verified and Closed Date']").val("");
		$("nobr:containsExactCase('Comments on Verification')").parent('h3').parent('td').parent('tr').hide();
    }
});

///////////////////////////////////
//////////TOOLTIPS START///////////
///////////////////////////////////

$("input[title$='Corrective Action Title']").qtip({ 
    content: {
      text: 'Please enter a short description for this corrective action.'
    }
});
$("input[title$='On Behalf']").qtip({ 
    content: {
      text: 'Tick the checkbox if you are logging this corrective action on behalf of someone else.'
    }
});

$("nobr:containsExactCase('Originator Name')").parent('h3').parent('td').parent('tr').qtip({ 
    content: {
        text: 'Please enter the originator name. The originator will also be the person who verify and review the correction action.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("textarea[title$='Discription of Issue']").qtip({ 
    content: {
      text: 'Clearly describe the issue and provide the background information behind this corrective action. Give as much information as you can.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("textarea[title$='Action required']").qtip({ 
    content: {
      text: 'Clearly outline the corrective actions to be taken. Make sure the end goal or the expected outcome is clearly communicated. Eg. Review the procedure 1234 to make sure it complies with the new Code of Practice abcd.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("select[title$='Function/Department']").qtip({ 
    content: {
        text: 'Select an option to indicate the function/department. Eg.: For workers in the factories, Sourcing Unit should be selected. Note: General Management is only for the CEO and associated roles that are not under any specific function or department.'
    }
});

$("select[title$='Source']").qtip({ 
    content: {
        text: 'Select an option to indicate the source of this corrective action.'
    }
});

$("input[title$='Source Reference No.']").qtip({ 
    content: {
        text: 'Please enter the source reference number or information if available. Eg, Safety Engagement on 30/06/2014 or Workplace Inspection done at Production hall on 30/06/2014.',
      title: 'Optional Field'
    }
});

$("nobr:contains('Responsible Person')").parent('h3').parent('td').parent('tr').qtip({ 
    content: {
        text: 'Please enter the name of the responsible person for this corrective action.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Recommended Due Date']").qtip({ 
    content: {
        text: 'Please enter a recommended due date. The due date should be set so that it reflect the risk level of the issue but should be reasonable and practical. Please note that the responsible person may propose a new due date based on some valid reasons later on.',
		title: 'General Guidelines'
    }
});

$("input[title$='Propose a Due Date?']").qtip({ 
    content: {
        text: 'Tick the checkbox to propose a new due date if you believe the recommended due date is not reasonable. You will need to provide reasons in detail.',
		title: 'Optional'
    }
});

$("input[title$='Proposed Due Date']").qtip({ 
    content: {
        text: 'Please enter a proposed due date. The due date should be set so that it reflect the risk level of the issue but should be reasonable and practical. Please note that the originator may contact you in order you to reach an agreement on a final due date.',
		title: 'General Guidelines'
    }
});

$("textarea[title$='Reason for Proposal']").qtip({ 
    content: {
      text: 'Please clearly specify the reason why the new due date was proposed.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Agreed Due Date']").qtip({ 
    content: {
        text: 'This date is automatically set as the later date between Recommended Due Date and Proposed Due Date. Please update this date with a final due date which was agreed by the responsible person. You may leave this date as it is if the date seems reasonable.',
		title: 'Optional'
    }
});

$("input[title$='Completed']").qtip({ 
    content: {
        text: 'Tick the checkbox to mark this corrective action as completed. Your name and today will be automatically stamped here.'
    }
});

$("textarea[title$='Comments on Completion']").qtip({ 
    content: {
      text: 'Please provide information on the completion of this corrective action. Outline what was done and how it was done where possible.',
      title: 'General Guidelines'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});

$("input[title$='Verified and Closed']").qtip({ 
    content: {
        text: 'Tick the checkbox to mark this corrective action as verified and closed. You need to make sure the corrective action was completed and end goal / expected outcome has been achieved. Your name and today will be automatically stamped here.'
    }
});

$("textarea[title$='Comments on Verification']").qtip({ 
    content: {
      text: 'Please provide comments where necessary.',
      title: 'Optional'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});




});
