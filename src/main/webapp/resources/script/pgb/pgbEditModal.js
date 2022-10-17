$(document).ready(function () {
	
	$("#pgbEditModal").on('show.bs.modal', function() {
		$.settingDto();
	});

	$("#pgbEditModal").on('shown.bs.modal', function() {
		$(".modal-backdrop").remove();
		$("#pgbEditModal").css("z-index", "800");
	});

	$("#closeLtoCardBtn").on("click", function() {
		$("#ltoCard").collapse("hide");
	});
	
	$("#closeStoCardBtn").on("click", function() {
		$("#stoCard").collapse("hide");
	});
	
	$.collapseLtoChart = function() {
		$("#ltoChart").collapse("toggle");
	};

	$.getBtnStyle = function(status) {
		var className = '';
		if(status == "CMP"){
			className = 'btn-outline-success';
		} else if(status == "STP") {
			className = 'btn-outline-danger';
		} else {
			className = 'btn-outline-dark';
		}
		return className;
	};
	
	$.settingDto = function() {
		var params = {
				studentSeq : $("#studentSeq").val()
			};
		$.ajax({
            type : "POST",
            url : "/pgb/pgbDtoListSelect.ajax",
            data : params,
            success : function(res){
            	$.makeDtoItem(res.dataList);
            	$.settingLto(res.dataList[0].domainSeq);
            	
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	
	$.makeDtoItem = function(dataList) {
		$("#dtoBtnGroup").empty();
		dataList.forEach(function(item, index) {
			var btnStyle = $.getBtnStyle(item.domainStatus);
			if(index == 0) { btnStyle += ' active'; }
			var html = '<button type="button" name="dtoItemBtn" class="btn '+btnStyle+' item-btn" data-value="'+item.domainSeq+'">'+item.domainName+'</button>'
			$("#dtoBtnGroup").append(html);
		});
	};
	
	$.settingLto = function(domainSeq, ltoSeq) {
		var params = {
				domainSeq : domainSeq
			};
		$.ajax({
            type : "POST",
            url : "/pgb/pgbLtoListSelect.ajax",
            data : params,
            success : function(res){
            	if(res.dataList.length > 0 ){
            		if(ltoSeq){
            			$.makeLtoItem(res.dataList, ltoSeq);
            			$.settingLtoDetail(ltoSeq);
            			$.settingSto(ltoSeq);
            		} else {
            			$.makeLtoItem(res.dataList);
            			$.settingLtoDetail(res.dataList[0].ltoSeq);
            			$.settingSto(res.dataList[0].ltoSeq);
            		}
            		$("#ltoCard").collapse("show");
            	} else {
            		$("#ltoBtnGroup").empty();
                	$("#ltoCard").collapse("hide");
            	}
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	
	$.makeLtoItem = function(dataList, ltoSeq) {
		$("#ltoBtnGroup").empty();
		dataList.forEach(function(item, index) {
			var btnStyle = $.getBtnStyle(item.ltoStatus);
			if(ltoSeq){
				if(ltoSeq == item.ltoSeq) { btnStyle += ' active'; }
			} else {
				if(index == 0) { btnStyle += ' active'; }
			}
			
			var html = '<button type="button" name="ltoItemBtn" class="btn '+btnStyle+' item-btn" data-value="'+item.ltoSeq+'">'+item.ltoName+'</button>';
			$("#ltoBtnGroup").append(html);
		});
	};
	
	$.settingLtoDetail = function(ltoSeq) {
		var params = {
				ltoSeq : ltoSeq
			};
		$.ajax({
            type : "POST",
            url : "/pgb/pgbLtoOneSelect.ajax",
            data : params,
            success : function(res){
            	$("label[name=labelLtoStatus]").removeClass("active");
            	$("input[name=btnLtoStatus]").removeAttr("checked");
            	
            	$("#ltoSeq").val(res.data.ltoSeq);
            	$("#labelLtoName").text(res.data.ltoName);
            	$("#labelLtoContents").text(res.data.ltoContents);
            	$("#labelLtoStatus_"+res.data.ltoStatus).addClass("active");
            	$("#btnLtoStatus_"+res.data.ltoStatus).attr("checked", true);
            	
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	
	$.settingSto = function(ltoSeq, stoSeq) {
		var params = {
				ltoSeq : ltoSeq
			};
		$.ajax({
            type : "POST",
            url : "/pgb/pgbStoListSelect.ajax",
            data : params,
            success : function(res){
            	if(res.dataList.length > 0){
            		if(stoSeq){
                		$.makeStoItem(res.dataList, stoSeq);
                		$.settingStoDetail(stoSeq);
                	} else {
                		$.makeStoItem(res.dataList, res.dataList[0].stoSeq);
                		$.settingStoDetail(res.dataList[0].stoSeq);
                	}
            		$("#stoCard").collapse("show");
            	} else {
            		$("#stoBtnGroup").empty();
                	$("#stoCard").collapse("hide");
            	}
            	
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	
	$.makeStoItem = function(dataList, stoSeq) {
		$("#stoBtnGroup").empty();
		dataList.forEach(function(item, index) {
			var btnStyle = $.getBtnStyle(item.stoStatus);
			if(stoSeq){
				if(stoSeq == item.stoSeq) { btnStyle += ' active'; }
			} else {
				if(index == 0) { btnStyle += ' active'; }
			}
			var html = '<button type="button" name="stoItemBtn" class="btn '+btnStyle+' item-btn" data-value="'+item.stoSeq+'">'+item.stoName+'</button>';
			$("#stoBtnGroup").append(html);
		});
	};
	
	$.settingStoDetail = function(stoSeq) {
		var params = {
				stoSeq : stoSeq
			};
		$.ajax({
            type : "POST",
            url : "/pgb/pgbStoOneSelect.ajax",
            data : params,
            success : function(res){
            	$("label[name=labelStoStatus]").removeClass("active");
            	$("input[name=btnStoStatus]").removeAttr("checked");
            	
            	$("#stoSeq").val(res.data.stoSeq);
            	$("#labelStoName").text(res.data.stoName);
            	$("#labelStoContents").text(res.data.stoContents);
            	$("#labelStoTrialCnt").text(res.data.stoTrialCnt);
            	$("#labelStoArrStdPst").text(res.data.stoArrStdPst);
            	$("#labelStoUrgeContents").text(res.data.stoUrgeContents);
            	$("#labelStoEnforceContents").text(res.data.stoEnforceContents);
            	$("#labelStoMemoContents").text(res.data.stoMemoContents);
            	
            	$("#labelStoStatus_"+res.data.stoStatus).addClass("active");
            	$("#btnStoStatus_"+res.data.stoStatus).attr("checked", true);
            	
            	$.setPointBorder();
            	if(res.data){
            		$("#stoCard").collapse("show");
            	}
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	
	$.openLtoRegistModal = function(flag) {
		var domainSeq = $('button[name=dtoItemBtn].active').attr('data-value');
		$("input[name=domainSeq]").val(domainSeq);
		$("input[name=ltoSeq]").val($("#ltoSeq").val());
		
		if(flag == 0){
			//등록
			$("#LTORegistModalLabel").text("LTO 등록");
			$("#LTOSaveBtn").show();
			$("#LTOUpdateBtn").hide();
			$("input[name=ltoName]").val("");
			$("input[name=ltoContents]").val("");
		} else {
			//수정
			$("#LTORegistModalLabel").text("LTO 수정");
			$("#LTOSaveBtn").hide();
			$("#LTOUpdateBtn").show();
			$("input[name=ltoName]").val($("#labelLtoName").text());
			$("input[name=ltoContents]").val($("#labelLtoContents").text());
		}
		
		$("#LTORegistModal").modal('show');
	};
	
	$.registLto = function(flag) {
		
		if($("input[name=ltoName]").val().trim() == ""){
			$("input[name=ltoName]").focus();
			alert("LTO 이름을 입력하세요.");
			return;
		}
		
		var params = $("#LTOForm").serialize();
		var url = (flag == 0) ? "/pgb/pgbLtoInsert.ajax" : "/pgb/pgbLtoUpdate.ajax";
		
		$.ajax({
            type : "POST",
            url : url,
            data : params,
            success : function(res){
            	if(flag == 0){
            		$.settingLto($("input[name=domainSeq]").val());
            	} else {
            		$.settingLto($("input[name=domainSeq]").val(), $("input[name=ltoSeq]").val());
            	}
            	$("#LTORegistModal").modal('hide');
            	$("#stoCard").collapse("hide");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	

	$.openStoRegistModal = function(flag) {
		var ltoSeq = $('button[name=ltoItemBtn].active').attr('data-value');
		var stoSeq = $('button[name=stoItemBtn].active').attr('data-value');
		stoSeq = stoSeq ? stoSeq : 0;
		$("input[name=ltoSeq]").val(ltoSeq);
		$("input[name=stoSeq]").val(stoSeq);
		
		if(flag == 0){
			//등록
			$("#STORegistModalLabel").text("STO 등록");
			$("#STOSaveBtn").show();
			$("#STOUpdateBtn").hide();
			$("select[name=stoArrStdPst]").val("90");
			$("input[name=stoTrialCnt]").val("15");
			$("input[name=stoName]").val("");
			$("input[name=stoContents]").val("");
			$("input[name=stoUrgeContents]").val("");
			$("input[name=stoEnforceContents]").val("");
			$("input[name=stoMemoContents]").val("");
		} else {
			//수정
			$("#STORegistModalLabel").text("STO 수정");
			$("#STOSaveBtn").hide();
			$("#STOUpdateBtn").show();
			$("select[name=stoArrStdPst]").val($("#labelStoArrStdPst").text());
			$("input[name=stoTrialCnt]").val($("#labelStoTrialCnt").text());
			$("input[name=stoName]").val($("#labelStoName").text());
			$("input[name=stoContents]").val($("#labelStoContents").text());
			$("input[name=stoUrgeContents]").val($("#labelStoUrgeContents").text());
			$("input[name=stoEnforceContents]").val($("#labelStoEnforceContents").text());
			$("input[name=stoMemoContents]").val($("#labelStoMemoContents").text());
		}
		
		$("#STORegistModal").modal('show');
	};
	
	$.registSto = function(flag) {
		
		if($("input[name=stoTrialCnt]").val() == 0){
			$("input[name=stoTrialCnt]").focus();
			alert("도달 기준 횟수를 입력하세요.");
			return;
		}
		if($("input[name=stoName]").val().trim() == ""){
			$("input[name=stoName]").focus();
			alert("STO 이름을 입력하세요.");
			return;
		}
		
		var params = $("#STOForm").serialize();
		var url = (flag == 0) ? "/pgb/pgbStoInsert.ajax" : "/pgb/pgbStoUpdate.ajax";
		
		$.ajax({
            type : "POST",
            url : url,
            data : params,
            success : function(res){
            	if(flag==0){
            		$.settingSto($("input[name=ltoSeq]").val());
            	} else {
            		$.settingSto($("input[name=ltoSeq]").val(), $("input[name=stoSeq]").val());
            	}
            	$("#STORegistModal").modal('hide');
            	$("#stoCard").collapse("show");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	};
	
	$("input[name=btnLtoStatus]").on('click', function() {
		$("input[name=btnLtoStatus]").removeAttr("checked");
		$(this).attr("checked", true);
		
		var ltoSeq = $('button[name=ltoItemBtn].active').attr('data-value');
		var domainSeq = $('button[name=dtoItemBtn].active').attr('data-value');
		var ltoStatus = $(this).val();
		
		var params = {
				domainSeq : domainSeq ,
				ltoSeq : ltoSeq ,
				ltoStatus : ltoStatus
		};
		
		$.ajax({
            type : "POST",
            url : "/pgb/pgbLtoStautsUpdate.ajax",
            data : params,
            success : function(res){
            	$('button[name=dtoItemBtn].active').removeClass('btn-outline-dark btn-outline-success');
            	if(res.data == 'CMP'){
            		$('button[name=dtoItemBtn].active').addClass('btn-outline-success');
            	} else {
            		$('button[name=dtoItemBtn].active').addClass('btn-outline-dark');
            	}
            	
            	$('button[name=ltoItemBtn].active').removeClass('btn-outline-dark btn-outline-success btn-outline-danger');
            	if(ltoStatus == "CMP"){
            		$('button[name=ltoItemBtn].active').addClass('btn-outline-success');
            	} else if(ltoStatus == "STP") {
            		$('button[name=ltoItemBtn].active').addClass('btn-outline-danger');
            	} else {
            		$('button[name=ltoItemBtn].active').addClass('btn-outline-dark');
            	}
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	});
	
	$("input[name=btnStoStatus]").on('click', function() {
		$("input[name=btnStoStatus]").removeAttr("checked");
		$(this).attr("checked", true);
		
		var domainSeq = $('button[name=dtoItemBtn].active').attr('data-value');
		var ltoSeq = $('button[name=ltoItemBtn].active').attr('data-value');
		var stoSeq = $('button[name=stoItemBtn].active').attr('data-value');
		var stoStatus = $(this).val();
		
		var params = {
				domainSeq : domainSeq ,
				ltoSeq : ltoSeq ,
				stoSeq : stoSeq ,
				stoStatus : stoStatus
		};
		
		$.ajax({
            type : "POST",
            url : "/pgb/pgbStoStautsUpdate.ajax",
            data : params,
            success : function(res){
            	
            	$('button[name=dtoItemBtn].active').removeClass('btn-outline-dark btn-outline-success');
            	if(res.dtoStatus == 'CMP'){
            		$('button[name=dtoItemBtn].active').addClass('btn-outline-success');
            	} else {
            		$('button[name=dtoItemBtn].active').addClass('btn-outline-dark');
            	}
            	
            	$('button[name=ltoItemBtn].active').removeClass('btn-outline-dark btn-outline-success btn-outline-danger');
            	if(res.ltoStatus == "CMP"){
            		$('button[name=ltoItemBtn].active').addClass('btn-outline-success');
            	} else if(res.ltoStatus == "STP") {
            		$('button[name=ltoItemBtn].active').addClass('btn-outline-danger');
            	} else {
            		$('button[name=ltoItemBtn].active').addClass('btn-outline-dark');
            	}
            	$("input[name=btnLtoStatus]").removeAttr("checked");
            	$("label[name=labelLtoStatus]").removeClass("active");
        		$("#btnLtoStatus_"+res.ltoStatus).attr("checked", true);
        		$("#labelLtoStatus_"+res.ltoStatus).addClass("active");
            	
            	$('button[name=stoItemBtn].active').removeClass('btn-outline-dark btn-outline-success btn-outline-danger');
            	if(stoStatus == "CMP"){
            		$('button[name=stoItemBtn].active').addClass('btn-outline-success');
            	} else if(stoStatus == "STP") {
            		$('button[name=stoItemBtn].active').addClass('btn-outline-danger');
            	} else {
            		$('button[name=stoItemBtn].active').addClass('btn-outline-dark');
            	}
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("서버오류. 담당자에게 연락하세요.")
            }
        });
	});
	
});

$(document).on("click", "button[name=dtoItemBtn]", function() {
	if(!$(this).hasClass("active")){
		$("button[name=dtoItemBtn]").removeClass("active")
		$(this).addClass("active");
		
		$.settingLto($(this).attr("data-value"));
		
		$("#stoCard").collapse("hide");
	} else {
	}
});

$(document).on("click", "button[name=ltoItemBtn]", function() {
	if(!$(this).hasClass("active")){
		$("button[name=ltoItemBtn]").removeClass("active")
		$(this).addClass("active");
		
		$.settingLtoDetail($(this).attr("data-value"));
		$("#ltoCard").collapse("show");
		
		$.settingSto($(this).attr("data-value"));
	} else {
		$("#ltoCard").collapse("toggle");
	}
});

$(document).on("click", "button[name=stoItemBtn]", function() {
	if(!$(this).hasClass("active")){
		$("button[name=stoItemBtn]").removeClass("active");
    	$(this).addClass("active");
    	
    	$.settingStoDetail($(this).attr("data-value"));
	} else {
		$("#stoCard").collapse("toggle");
	}
});