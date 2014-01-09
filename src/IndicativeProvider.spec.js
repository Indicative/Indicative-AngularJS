describe("indicative provider", function(){
    var iEventBuilder, Indicative;

    beforeEach(angular.mock.module('indicative'));

    beforeEach(inject(function(_Indicative_, _iEventBuilder_){
        Indicative = _Indicative_;
        iEventBuilder = _iEventBuilder_;
    }));

    it("should exist", function(){
        expect(Indicative).toBeDefined();
        expect(iEventBuilder).toBeDefined();
    });

    it("Should send the right object", function(){
        var sendObj = {
            eventName : "name",
            eventUniqueId : "id",
            properties: {
                prop1: "val1",
                prop2: "val2"
            }
        };

        spyOn(Indicative, "addEvent");

        iEventBuilder.event("name")
            .uniqueID("id")
            .addProperty("prop1", "val1")
            .addProperty("prop2", "val2")
            .done();
        expect(Indicative.addEvent).toHaveBeenCalled();
        expect(Indicative.addEvent).toHaveBeenCalledWith(sendObj);
    });

    it("should send something twice, but flush out old", function(){
        var sendObj = {
            eventName : "name",
            properties: {
                prop1: "val1"
            }
        };
        spyOn(Indicative, "addEvent");

        iEventBuilder.event("name")
            .uniqueID("id")
            .addProperty("prop1", "val1")
            .addProperty("prop2", "val2")
            .done();

        iEventBuilder.event("name")
            .addProperty("prop1", "val1")
            .done();

        expect(Indicative.addEvent).toHaveBeenCalled();
        expect(Indicative.addEvent).toHaveBeenCalledWith(sendObj);
    });
});