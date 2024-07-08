import { createMachine, assign } from "xstate";

const bookingMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCuBPABABwDYEMA7MTAFwEsBjAazFNgDpzDyL9cBiAZQBUBBAEo8A2gAYAuolDYA9rFbkZhKSAAeiAEwBmUQy0AOfVoCsATlEA2U-o0AWDRoA0IdIn22Gti3dMbvt0wBGfQtbAF8w5zQsPCISCho6RlgwfAAnSgALDgBhAHkAOR4ASQBVAoBRMUkkEFl5CiUVdQRtXQMjM0trOwdnVwQAWkM9U1NbGwB2DUnRY1FJ-QiojBwCYjIqWnoGFPSs3L4CnIqAGWqVeoUm2pa7SYZF20Dx8e99cwt+xC0tBjGPsYTKJAgYtBNliBoms4ptEjtsPhYClCDA0rAOAARQpVCSXOTXZS3RCDDQLBjGYy2X4WKmLYyBYxfFw-DR6LQOEJGWyTQIWJaRKGrWIbBLbRiI5FgVFgdGHY5nC61K6NImgFqk8mU6laWk8-QMpnfBCMv6WWxzCxaUyhdwGSHQkXxLZJBhipIcABixQKxS4AAkldICarmpp2oFRHY+WMNMFJsZjRz2Zz+eDefyIoLCDIIHAVI71s74fBlSHFGq1CSLaZPJNdVGNK846ZjYNAgmGPpFqF+fNjAbxg7hUW4eKmCw2Lh8Q0K2GTcmtIzbCu3hoPpZjRaGJYE03RPYmcELMOYqP3Ts9hlMjPCfOtNNPKZJvWLVYbPYkxZ-oOOaIOX40yTKeMKii6CJIiiaKlsGs43OqJK6oEdYNg4zYvG2ky1lSIKiFyCwaAyIFOmOroXjBdTlvBVZDDYXYWlhkz2NSfK2EmbL6C8fhArSFiiHMIRZmEQA */
    createMachine({
        id: "buy plane tickets",
        initial: "initial",
        states: {
            initial: {
                on: {
                    START: "search",
                },
            },
            search: {
                on: {
                    CONTIUNE: "passengers",
                    CANCEL: "initial",
                },
            },
            passengers: {
                on: {
                    DONE: "tickets",
                    CANCEL: "initial",
                },
            },
            tickets: {
                on: {
                    FINISH: "initial",
                },
            },
        },
    });

export default bookingMachine;
