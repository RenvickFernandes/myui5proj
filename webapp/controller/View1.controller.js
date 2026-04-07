sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("livedigveh.controller.View1", {
        onInit() {
            // var oUserModel = new sap.ui.model.json.JSONModel();
            // this.getView().setModel(oUserModel, "oUserModel");
        },

        onSearch: function (oEvent) {
            const sQuery = oEvent.getParameter("newValue");
            const oTable = this.byId("vehicalTable");
            const oBinding = oTable.getBinding("items");

            const oSelect = this.byId("columnSelect");
            const sSelectedKey = oSelect.getSelectedKey();

            let aFilters = [];

            if (sQuery && sQuery.length > 0) {
                const Filter = sap.ui.model.Filter;
                const FilterOperator = sap.ui.model.FilterOperator;

                aFilters.push(
                new Filter({
                    filters: [
                        new Filter(sSelectedKey, FilterOperator.Contains, sQuery)
                    ],
                    and: false
                }));
            }

            oBinding.filter(aFilters);
        },

        onDeleteSingle: function(oEvent){
            const oItem = oEvent.getSource().getParent();
            const oContext = oItem.getBindingContext();
            const sPath = oContext.getPath();
            const oData = oContext.getObject();
            const oModel = this.getView().getModel();
            console.log("parma:" + JSON.stringify(oData));
            sap.m.MessageToast.show(oData.Material + " Deleted successfully");
            //  oModel.remove(sPath, {
            //     success: () => {
            //         sap.m.MessageToast.show("Deleted successfully");
            //     },
            //     error: (oError) => {
            //         console.error(oError);
            //         sap.m.MessageToast.show("Delete failed");
            //     }
            // });
        },

        onColumnFilter: function () {
            const oTable = this.byId("vehicalTable");
            const oBinding = oTable.getBinding("items");

            const Filter = sap.ui.model.Filter;
            const FilterOperator = sap.ui.model.FilterOperator;

            const aFilters = [];

            const aInputs = this.getView().findAggregatedObjects(true, (oControl) =>
                oControl.isA("sap.m.Input") && oControl.data("field")
            );

            aInputs.forEach((oInput) => {
                const sValue = oInput.getValue();
                const sField = oInput.data("field");

                if (sValue) {
                aFilters.push(
                    new Filter(sField, FilterOperator.Contains, sValue)
                );
                }
            });

            oBinding.filter(aFilters);
        }
    });
});