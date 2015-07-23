describe('registration: channel renderer', function() {

    it('could be defined as an empty object', function() {
        expect(function() {
            Rpd.channelrenderer('spec/foo', 'spec', {});
        }).not.toThrow();
    });

    describe('transferring with the events', function() {

        var updateSpy;
        var patch;
        var node;

        beforeEach(function() {
            updateSpy = jasmine.createSpy('update');

            Rpd.renderer('spec', function() { return updateSpy; });
            Rpd.channeltype('spec/foo');

            patch = Rpd.Patch.start().renderWith('spec').attachTo({});

            node = patch.addNode('spec/empty');
        });

        it('even if it\'s an empty object, passed with channel adding and updating event', function() {

            var renderer = {};

            Rpd.channelrenderer('spec/foo', 'spec', renderer);

            var inlet = node.addInlet('spec/foo', 'a');
            inlet.receive('a');
            var outlet = node.addOutlet('spec/foo', 'b');
            outlet.send('b');

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: renderer
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: renderer
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: renderer
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: renderer
                }));

        });

        xit('the normal update stream should not set this field to an update event', function() {
            var patchEventsSpy = jasmine.createSpy('patch-events');
            patch.events.onValue(patchEventsSpy);
            var nodeEventsSpy = jasmine.createSpy('node-events');
            node.events.onValue(nodeEventsSpy);

            var renderer = {};

            Rpd.channelrenderer('spec/foo', 'spec', renderer);

            var inlet = node.addInlet('spec/foo', 'a');
            inlet.receive('a');
            var outlet = node.addOutlet('spec/foo', 'b');
            outlet.send('b');

            expect(patchEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'inlet/add', render: renderer }));
            expect(patchEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'inlet/update', render: renderer }));
            expect(patchEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'outlet/add', render: renderer }));
            expect(patchEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'outlet/update', render: renderer }));

            expect(nodeEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'inlet/add', render: renderer }));
            expect(nodeEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'inlet/update', render: renderer }));
            expect(nodeEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'outlet/add', render: renderer }));
            expect(nodeEventsSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({ type: 'outlet/update', render: renderer }));

        });

        it('one could define render-show function which is passed both with channel adding and updating event', function() {

            var renderShow = function() {};
            var renderer = { show: renderShow };

            Rpd.channelrenderer('spec/foo', 'spec', renderer);

            var inlet = node.addInlet('spec/foo', 'a');
            inlet.receive('a');
            var outlet = node.addOutlet('spec/foo', 'b');
            outlet.send('b');

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: { show: renderShow }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: { show: renderShow }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: { show: renderShow }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: { show: renderShow }
                }));

        });

        it('one could define render-edit function which is passed both with node adding event and node processing events', function() {

            var renderEdit = function() {};
            var renderer = { edit: renderEdit };

            Rpd.channelrenderer('spec/foo', 'spec', renderer);

            var inlet = node.addInlet('spec/foo', 'a');
            inlet.receive('a');
            var outlet = node.addOutlet('spec/foo', 'b');
            outlet.send('b');

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: { edit: renderEdit }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: { edit: renderEdit }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: { edit: renderEdit }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: { edit: renderEdit }
                }));

        });

        it('one could define both render-show and render-edit functions which are passed with channel adding and updating events', function() {

            var renderShow = function() {},
                renderEdit = function() {};
            var renderer = { show: renderShow,
                             edit: renderEdit };

            Rpd.channelrenderer('spec/foo', 'spec', renderer);

            var inlet = node.addInlet('spec/foo', 'a');
            inlet.receive('a');
            var outlet = node.addOutlet('spec/foo', 'b');
            outlet.send('b');

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: { show: renderShow,
                              edit: renderEdit }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: { show: renderShow,
                              edit: renderEdit }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: { show: renderShow,
                              edit: renderEdit }
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: { show: renderShow,
                              edit: renderEdit }
                }));

        });

        it('one could define a single function which is executed on every node creation and returns the renderer for that node', function() {

            var renderers = {};
            var rendererGenSpy = jasmine.createSpy('renderer-generator')
                                        .and.callFake(function(channel) {
                return (renderers[channel.name] = {
                    show: function() { },
                    edit: function() { },
                });
            });

            Rpd.channelrenderer('spec/foo', 'spec', rendererGenSpy);

            var inletA = node.addInlet('spec/foo', 'inlet-a');
            inletA.receive('a');

            expect(rendererGenSpy).toHaveBeenCalledOnce();
            expect(rendererGenSpy).toHaveBeenCalledWith(inletA);

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: renderers['inlet-a']
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: renderers['inlet-a']
                }));

            var inletB = node.addInlet('spec/foo', 'inlet-b');
            inletB.receive('b');

            expect(rendererGenSpy).toHaveBeenCalledTwice();
            expect(rendererGenSpy).toHaveBeenCalledWith(inletB);

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: renderers['inlet-b']
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: renderers['inlet-b']
                }));

            var outletA = node.addOutlet('spec/foo', 'outlet-a');
            outletA.send('a');

            expect(rendererGenSpy).toHaveBeenCalledTimes(3);
            expect(rendererGenSpy).toHaveBeenCalledWith(outletA);

            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: renderers['outlet-a']
                }));
            expect(updateSpy).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: renderers['outlet-a']
                }));

        });

        it('not passes this renderer if current renderer is different from the registered one', function() {

            var renderShow = function() {},
                renderEdit = function() {};
            var renderer = { show: renderShow,
                             edit: renderEdit };

            Rpd.channelrenderer('spec/foo', 'sp_c', renderer);

            node.addInlet('spec/foo','a').receive('a');
            node.addInlet('spec/foo','b').receive('b');
            node.addOutlet('spec/foo','c').send('c');

            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: jasmine.objectContaining({ show: renderShow })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/add',
                    render: jasmine.objectContaining({ edit: renderEdit })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: jasmine.objectContaining({ show: renderShow })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'inlet/update',
                    render: jasmine.objectContaining({ edit: renderEdit })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: jasmine.objectContaining({ show: renderShow })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/add',
                    render: jasmine.objectContaining({ edit: renderEdit })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: jasmine.objectContaining({ show: renderShow })
                }));
            expect(updateSpy).not.toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: 'outlet/update',
                    render: jasmine.objectContaining({ edit: renderEdit })
                }));

        });

    });

});
